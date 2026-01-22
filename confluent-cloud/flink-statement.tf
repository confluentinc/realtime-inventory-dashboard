
resource "confluent_flink_statement" "create-table" {
  organization {
    id = data.confluent_organization.main.id
  }
  environment {
    id = data.confluent_environment.myenv.id
  }
  credentials {
    key    = confluent_api_key.app-manager-flink-api-key.id
    secret = confluent_api_key.app-manager-flink-api-key.secret
  }
  compute_pool {
    id = data.confluent_flink_compute_pool.main.id
  }
  principal {
    id = data.confluent_user.account.id
  }

  statement = file("./statements/create-table.sql")

  properties = {
    "sql.current-catalog"  = data.confluent_environment.myenv.display_name
    "sql.current-database" = data.confluent_kafka_cluster.main.display_name
    "sql.local-time-zone"  = "UTC"
  }

  rest_endpoint = data.confluent_flink_region.main.rest_endpoint

  statement_name = "create-inventory-product-table"

  stopped = false
}

resource "confluent_flink_statement" "example" {
  organization {
    id = data.confluent_organization.main.id
  }
  environment {
    id = data.confluent_environment.myenv.id
  }
  credentials {
    key    = confluent_api_key.app-manager-flink-api-key.id
    secret = confluent_api_key.app-manager-flink-api-key.secret
  }
  compute_pool {
    id = data.confluent_flink_compute_pool.main.id
  }
  principal {
    id = data.confluent_user.account.id
  }

  statement = file("./statements/generate-order-message.sql")

  properties = {
    "sql.current-catalog"  = data.confluent_environment.myenv.display_name
    "sql.current-database" = data.confluent_kafka_cluster.main.display_name
    "sql.local-time-zone"  = "UTC"
  }

  rest_endpoint = data.confluent_flink_region.main.rest_endpoint

  statement_name = "generate-inventory-product-id-01-e"

  depends_on = [
    confluent_flink_statement.create-table
  ]
  stopped = false
}
