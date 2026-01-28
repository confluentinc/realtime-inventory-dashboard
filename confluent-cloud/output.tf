

output "bootstrap-server" {
  description = "Confluent Server Endpoint"
  value       = data.confluent_kafka_cluster.main.bootstrap_endpoint
}


output "sr-endpoint" {
  description = "Schema Registry Endpoint"
  value       = data.confluent_schema_registry_cluster.myenv.rest_endpoint
}

