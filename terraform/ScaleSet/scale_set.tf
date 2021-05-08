terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.57.0"
    }
  }
}

provider "azurerm" {
  features {}
}

variable "rg_name" {
  default = "JTFMemeteca"
}

variable "rg_location" {
  default = "Eastus"
}

variable "prefix" {
  default = "JTF-"
}

resource "azurerm_resource_group" "rg" {
  name     = var.rg_name
  location = var.rg_location
}

################# VM with public IP 
resource "azurerm_virtual_network" "jtfvn" {
  name                = "jtfVirtualNetwork"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_subnet" "jtfsubnet" {
  name                 = "jtfSubnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.jtfvn.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_public_ip" "jtfpublicip" {
  name                = "jtfpublicip"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  allocation_method   = "Static"

}

resource "azurerm_network_interface" "jtfnic" {
  name                = "jtf-nic"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.jtfsubnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.jtfpublicip.id
  }
}

resource "azurerm_linux_virtual_machine" "jtfvm" {
  name                = "jtfVM"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  size                = "Standard_B1ls"
  admin_username      = "memetecadmin"
  network_interface_ids = [
    azurerm_network_interface.jtfnic.id,
  ]

  admin_ssh_key {
    username   = "memetecadmin"
    public_key = file("~/.ssh/memetecakey.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }
}
################### Scale set with private IP 
resource "azurerm_linux_virtual_machine_scale_set" "jtfscaleset" {
  name                = "memetecascaleset"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard_B1ls"
  instances           = 2
  admin_username      = "memeteca-admin"

  admin_ssh_key {
    username   = "memeteca-admin"
    public_key = file("~/.ssh/memetecakey.pub")
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }

  os_disk {
    storage_account_type = "Standard_LRS"
    caching              = "ReadWrite"
  }

  network_interface {
    name    = "example"
    primary = true

    ip_configuration {
      name      = "internal"
      primary   = true
      subnet_id = azurerm_subnet.jtfsubnet.id
    }
  }
}
