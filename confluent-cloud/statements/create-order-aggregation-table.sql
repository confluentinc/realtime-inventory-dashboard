CREATE TABLE IF NOT EXISTS `orders_5min_realtime` (
  `bucket_start` BIGINT NOT NULL,
  `product_id` INT NOT NULL,
  `total_orders` BIGINT,
  `total_quantity` BIGINT,
  `total_revenue` DECIMAL(38, 2),
  `avg_order_value` DECIMAL(10, 2),
  `last_updated` TIMESTAMP(3),
  CONSTRAINT `PK_bucket_start_product_id` PRIMARY KEY (`bucket_start`, `product_id`) NOT ENFORCED
)
DISTRIBUTED BY HASH(`bucket_start`, `product_id`) INTO 4 BUCKETS;