provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "jtfrg" {
  name     = "jtfRG"
  location = "West Europe"
}

resource "azurerm_virtual_network" "jtfvn" {
  name                = "jtfVirtualNetwork"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.jtfrg.location
  resource_group_name = azurerm_resource_group.jtfrg.name
}

resource "azurerm_subnet" "jtfsubnet" {
  name                 = "jtfSubnet"
  resource_group_name  = azurerm_resource_group.jtfrg.name
  virtual_network_name = azurerm_virtual_network.jtfvn.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_network_interface" "jtfnic" {
  name                = "jtf-nic"
  location            = azurerm_resource_group.jtfrg.location
  resource_group_name = azurerm_resource_group.jtfrg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.jtfsubnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.jtfpublicip.id
  }
}

resource "azurerm_public_ip" "jtfpublicip" {
  name                = "jtfpublicip"
  resource_group_name = azurerm_resource_group.jtfrg.name
  location            = azurerm_resource_group.jtfrg.location
  allocation_method   = "Static"

}

resource "azurerm_linux_virtual_machine" "jtfvm" {
  name                = "jtfVM"
  resource_group_name = azurerm_resource_group.jtfrg.name
  location            = azurerm_resource_group.jtfrg.location
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

resource "azurerm_linux_virtual_machine_scale_set" "jtfscaleset" {
  name                = "memetecascaleset"
  resource_group_name = azurerm_resource_group.jtfrg.name
  location            = azurerm_resource_group.jtfrg.location
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
