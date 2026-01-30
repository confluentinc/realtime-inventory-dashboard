terraform {
  required_version = ">= 0.14.0"
  required_providers {
    confluent = {
      source  = "confluentinc/confluent"
      version = "2.58.0"
    }
  }
}

# Option #1: Manage multiple clusters in the same Terraform workspace
provider "confluent" {
  
}
