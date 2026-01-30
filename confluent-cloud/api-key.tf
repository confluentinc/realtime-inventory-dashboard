
resource "confluent_api_key" "app-manager-flink-api-key" {
  display_name = "flink-tf-api-key"
  description  = "Flink API Key that is owned by ${data.confluent_user.account.full_name} user account"
  owner {
    id          = data.confluent_user.account.id
    api_version = data.confluent_user.account.api_version
    kind        = data.confluent_user.account.kind
  }
  managed_resource {
    id          = data.confluent_flink_region.main.id
    api_version = data.confluent_flink_region.main.api_version
    kind        = data.confluent_flink_region.main.kind
    environment {
      id = data.confluent_environment.myenv.id
    }
  }
}

resource "confluent_api_key" "app-manager-kafka-api-key" {
  display_name = "kafka-tf-api-key"
  description  = "Kafka API Key that is owned by ${data.confluent_user.account.full_name} user account"
  owner {
    id          = data.confluent_user.account.id
    api_version = data.confluent_user.account.api_version
    kind        = data.confluent_user.account.kind
  }
  managed_resource {
    id          = data.confluent_kafka_cluster.main.id
    api_version = data.confluent_kafka_cluster.main.api_version
    kind        = data.confluent_kafka_cluster.main.kind
    environment {
      id = data.confluent_environment.myenv.id
    }
  }
}

resource "confluent_api_key" "schema-registry-api-key" {
  display_name = "schema-registry-tf-api-key"
  description  = "Schema Registry API Key that is owned by ${data.confluent_user.account.full_name} user account"
  owner {
    id          = data.confluent_user.account.id
    api_version = data.confluent_user.account.api_version
    kind        = data.confluent_user.account.kind
  }

  managed_resource {
    id          = data.confluent_schema_registry_cluster.myenv.id
    api_version = data.confluent_schema_registry_cluster.myenv.api_version
    kind        = data.confluent_schema_registry_cluster.myenv.kind

    environment {
      id = data.confluent_environment.myenv.id
    }
  }
}