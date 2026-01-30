
resource "confluent_flink_statement" "create-order-table" {
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

  statement = file("./statements/create-order-table.sql")

  properties = {
    "sql.current-catalog"  = data.confluent_environment.myenv.display_name
    "sql.current-database" = data.confluent_kafka_cluster.main.display_name
    "sql.local-time-zone"  = "UTC"
  }

  rest_endpoint = data.confluent_flink_region.main.rest_endpoint

  statement_name = "create-order-table"

  depends_on = [
    confluent_flink_statement.create-table
  ]
  stopped = false
}

resource "confluent_flink_statement" "generate-order-flow" {
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

  statement = file("./statements/generate-order-flow.sql")

  properties = {
    "sql.current-catalog"  = data.confluent_environment.myenv.display_name
    "sql.current-database" = data.confluent_kafka_cluster.main.display_name
    "sql.local-time-zone"  = "UTC"
  }

  rest_endpoint = data.confluent_flink_region.main.rest_endpoint

  statement_name = "generate-order-flow"

  depends_on = [
    confluent_flink_statement.create-order-table
  ]
  stopped = false
}

resource "confluent_flink_statement" "create-order-aggregation" {
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

  statement = file("./statements/create-order-aggregation-table.sql")

  properties = {
    "sql.current-catalog"  = data.confluent_environment.myenv.display_name
    "sql.current-database" = data.confluent_kafka_cluster.main.display_name
    "sql.local-time-zone"  = "UTC"
  }

  rest_endpoint = data.confluent_flink_region.main.rest_endpoint

  statement_name = "create-order-aggregation"

  stopped = false
}


resource "confluent_flink_statement" "generate-order-aggregation" {
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

  statement = file("./statements/generate-order-aggregation.sql")

  properties = {
    "sql.current-catalog"  = data.confluent_environment.myenv.display_name
    "sql.current-database" = data.confluent_kafka_cluster.main.display_name
    "sql.local-time-zone"  = "UTC"
  }

  rest_endpoint = data.confluent_flink_region.main.rest_endpoint

  statement_name = "generate-order-aggregation"

  depends_on = [
    confluent_flink_statement.create-order-aggregation
  ]
  
  stopped = false
}

