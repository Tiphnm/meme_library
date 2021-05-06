# We strongly recommend using the required_providers block to set the
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

variable "failover_location" {
  default = "westeurope"
}

variable "prefix" {
  default = "JTF-"
}

resource "azurerm_resource_group" "rg" {
  name     = var.rg_name
  location = var.rg_location
}


resource "azurerm_cosmosdb_account" "db" {
  name                = "memetecacosmos"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  enable_automatic_failover = true

  capabilities {
    name = "EnableAggregationPipeline"
  }

  capabilities {
    name = "mongoEnableDocLevelTTL"
  }

  capabilities {
    name = "MongoDBv3.4"
  }

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

/*
  geo_location {
    location          = var.failover_location
    failover_priority = 1
  }
*/
  geo_location {
    location          = azurerm_resource_group.rg.location
    failover_priority = 0
  }
}


# Mongo database

resource "azurerm_cosmosdb_mongo_database" "db" {
  name                = "memetecaDB"
  resource_group_name = azurerm_cosmosdb_account.db.resource_group_name
  account_name        = azurerm_cosmosdb_account.db.name
  throughput          = 400
}

# Mongo first collection 

#Users 
# resource "azurerm_cosmosdb_mongo_collection" "users" {
#   name                = "users"
#   resource_group_name = azurerm_cosmosdb_account.db.resource_group_name
#   account_name        = azurerm_cosmosdb_account.db.name
#   database_name       = azurerm_cosmosdb_mongo_database.db.name
#   default_ttl_seconds = "777"
#   shard_key           = "_id"
#   throughput          = 400
# }
