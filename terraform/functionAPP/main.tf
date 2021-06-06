
# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.57.0"
    }
  }
}


# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

#Import variables 
variable "rg_name" {
  default = "JTFMemeteca"
}

variable "rg_location" {
  default = "Eastus"
}


variable "prefix" {
  default = "JTF-"
}

variable "environment" {
    type = string
    default = "dev"
}

variable "functionapp" {
    type = string
    default = "../../function/build/functionapp.zip"
}

resource "random_string" "storage_name" {
    length = 24
    upper = false
    lower = true
    number = true
    special = false
}

#Get the azure resource group
data "azurerm_resource_group" "rg" {
  name  = "JTFMemeteca"
}

# Get the blob storage account
data "azurerm_storage_account" "storage" {
  name = "memetecastorage"
  resource_group_name = data.azurerm_resource_group.rg.name
}

# Create a container to deploy the app 
resource "azurerm_storage_container" "deploy" {
    name = "function-releases"
    storage_account_name = "${data.azurerm_storage_account.storage.name}"
    container_access_type = "private"
}

# Uploap the .zip function to the blob storage
resource "azurerm_storage_blob" "appcode" {
    name = "functionapp.zip"
    storage_account_name = "${data.azurerm_storage_account.storage.name}"
    storage_container_name = "${azurerm_storage_container.deploy.name}"
    type = "Block"
    source = "${var.functionapp}"
}

####  Get the SAS (Shared Access Secret) #####

data "azurerm_storage_account_sas" "sas" {
    connection_string = "${data.azurerm_storage_account.storage.primary_connection_string}"
    https_only = true
    start = "2021-05-04"
    expiry = "2021-12-31"
    resource_types {
        object = true
        container = false
        service = false
    }
    services {
        blob = true
        queue = false
        table = false
        file = false
    }
    permissions {
        read = true
        write = false
        delete = false
        list = false
        add = false
        create = false
        update = false
        process = false
    }
}

# Create the App service plan ( consumption )
resource "azurerm_app_service_plan" "asp" {
    name = "memeteca-plan"
    resource_group_name = "${data.azurerm_resource_group.rg.name}"
    location = "${data.azurerm_resource_group.rg.location}"
    kind = "functionapp"
    reserved = false
    sku {
        tier = "Dynamic"
        size = "Y1"
    }
}


#  Create the function APP 
resource "azurerm_function_app" "functions" {
    name = "memetecafuncionapp"
    location = "${data.azurerm_resource_group.rg.location}"
    resource_group_name = "${data.azurerm_resource_group.rg.name}"
    app_service_plan_id = "${azurerm_app_service_plan.asp.id}"
    storage_account_name = "${data.azurerm_storage_account.storage.name}"
    storage_account_access_key = "${data.azurerm_storage_account.storage.primary_access_key}" 
    version = "~3"

    app_settings = {
        https_only = true
        FUNCTIONS_EXTENSION_VERSION=3
        FUNCTIONS_WORKER_RUNTIME = "node"
        WEBSITE_NODE_DEFAULT_VERSION = "~14"
        FUNCTION_APP_EDIT_MODE = "readwrite"
        HASH = "${base64encode(filesha256("${var.functionapp}"))}"
        WEBSITE_RUN_FROM_PACKAGE = "https://${data.azurerm_storage_account.storage.name}.blob.core.windows.net/${azurerm_storage_container.deploy.name}/${azurerm_storage_blob.appcode.name}${data.azurerm_storage_account_sas.sas.sas}"
    }
}

### Application insgiths to get access to logs
resource "azurerm_application_insights" "logs" {
  name                = "memeteca-appinsights"
  location            = "${data.azurerm_resource_group.rg.location}"
  resource_group_name = "${data.azurerm_resource_group.rg.name}"
  application_type    = "web"
}


output "name" {
  value = var.functionapp
}