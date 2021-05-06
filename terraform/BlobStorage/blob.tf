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

########### BLOB STORAGE ################
data "azurerm_resource_group" "rg" {
  name  = "JTFMemeteca"
}

resource "azurerm_storage_account" "blob" {
  name                     = "memetecastorage"
  resource_group_name      = data.azurerm_resource_group.rg.name
  location                 = data.azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  allow_blob_public_access = true
}

resource "azurerm_storage_container" "blob" {
  name                  = "memes"
  storage_account_name  = azurerm_storage_account.blob.name
  container_access_type = "blob"
}

resource "azurerm_storage_blob" "blob" {
  name                   = "hola.txt"
  storage_account_name   = azurerm_storage_account.blob.name
  storage_container_name = azurerm_storage_container.blob.name
  type                   = "Block"
  source                 = "../hola.txt"
}