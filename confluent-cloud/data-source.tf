
data "confluent_organization" "main" {}
data "confluent_environment" "myenv" {
  display_name = var.environment_name
}

data "confluent_schema_registry_cluster" "myenv" {
  environment {
    id = data.confluent_environment.myenv.id
  }
}


data "confluent_flink_region" "main" {
  cloud  = var.flink_cloud
  region = var.flink_region
}

data "confluent_flink_compute_pool" "main" {
  display_name = var.computepool_name
  
  environment {
    id = data.confluent_environment.myenv.id
  }
}

data "confluent_kafka_cluster" "main" {
  display_name = var.cluster_name
  environment {
    id = data.confluent_environment.myenv.id
  }
}

data "confluent_user" "account" {
  full_name = var.confluent_user_fullname
}