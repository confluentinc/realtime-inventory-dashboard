
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