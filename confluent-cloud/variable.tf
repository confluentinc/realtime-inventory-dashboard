

variable environment_name {
  type        = string
  default     = "taku-test-env"
  description = "Environment name"
}

variable cluster_name {
  type        = string
  default     = "taku-us-west-2-test"
  description = "Kafka cluster name"
}

variable confluent_user_fullname {
  type        = string
  default     = "Takuto Suzuki"
  description = "Confluent Cloud user full name"
}

variable computepool_name {
  type        = string
  default     = "taku-us-west2-pool"
  description = "Compute Pool name"
}

variable flink_cloud {
  type        = string
  default     = "AWS"
  description = "Flink CSP provider name"
}

variable flink_region {
  type        = string
  default     = "us-west-2"
  description = "Flink cloud region name"
}
