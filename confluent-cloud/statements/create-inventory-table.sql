CREATE TABLE IF NOT EXISTS `inventory_20260119_1902_test` (
  `productId` INT NOT NULL,
  `nameJa` VARCHAR(2147483647),
  `nameEn` VARCHAR(2147483647),
  `category` VARCHAR(2147483647),
  `shownInStore` INT,
  `updatedAt` TIMESTAMP(3),
  `inventoryQty` INT,
  `deliveryQty` INT,
  `salesPerHour` INT,
  CONSTRAINT `PK_productId` PRIMARY KEY (`productId`) NOT ENFORCED
)
DISTRIBUTED BY HASH(`productId`) INTO 6 BUCKETS
WITH (
  'changelog.mode' = 'append',
  'connector' = 'confluent',
  'kafka.cleanup-policy' = 'compact',
  'kafka.compaction.time' = '7 d',
  'kafka.max-message-size' = '2097164 bytes',
  'kafka.message-timestamp-type' = 'create-time',
  'kafka.retention.size' = '0 bytes',
  'kafka.retention.time' = '0 ms',
  'key.format' = 'avro-registry',
  'scan.bounded.mode' = 'unbounded',
  'scan.startup.mode' = 'earliest-offset',
  'value.format' = 'avro-registry'
);