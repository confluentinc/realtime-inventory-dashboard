INSERT INTO orders_5min_realtime
SELECT 
    (UNIX_TIMESTAMP() / 300) * 300 AS bucket_start,
    productId,
    COUNT(*) AS total_orders,
    CAST(SUM(quantity) AS BIGINT) AS total_quantity,
    SUM(totalAmount) AS total_revenue,
    CAST(AVG(totalAmount) AS DECIMAL(10, 2)) AS avg_order_value,
    MAX(orderTime) AS last_updated
FROM orders_output_table
GROUP BY 
    (UNIX_TIMESTAMP() / 300) * 300,
    productId;