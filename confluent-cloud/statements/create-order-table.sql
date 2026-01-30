CREATE TABLE IF NOT EXISTS `orders_output_table` (
  `orderId` BIGINT,
  `customerId` VARCHAR(2147483647),
  `productId` INT,
  `quantity` INT,
  `unitPrice` DECIMAL(10, 2),
  `totalAmount` DECIMAL(10, 2),
  `orderTime` TIMESTAMP(3),
  `status` VARCHAR(2147483647),
  `hourOfDay` INT,
  `purchaseProbability` DOUBLE,
  WATERMARK FOR `orderTime` AS `orderTime` - INTERVAL '5' SECOND
)
DISTRIBUTED BY HASH(`orderId`) INTO 6 BUCKETS;