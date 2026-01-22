INSERT INTO orders_output_table
SELECT 
    orderId,
    CAST(customerId AS STRING) AS customerId,
    productId,
    quantity,
    unitPrice,
    totalAmount,
    CAST(orderTime AS TIMESTAMP(3)) AS orderTime,
    CAST(status AS STRING) AS status,
    CAST(hourOfDay AS INT) AS hourOfDay,
    CAST(purchaseProbability AS DOUBLE) AS purchaseProbability
FROM (
    SELECT 
        window_start,
        window_end,
        
                               
        CAST(UNIX_TIMESTAMP() * 1000 + FLOOR(RAND() * 1000) AS BIGINT) AS orderId,
        
                                   
        'CUST-12345' AS customerId,
        
                                          
        CAST(1 + FLOOR(RAND() * 10) AS INT) AS productId,
        
                                
        CAST(1 + FLOOR(RAND() * 5) AS INT) AS quantity,
        
                            
        CAST(10.0 + (RAND() * 90.0) AS DECIMAL(10,2)) AS unitPrice,
        
                       
        CAST((1 + FLOOR(RAND() * 5)) * (10.0 + (RAND() * 90.0)) AS DECIMAL(10,2)) AS totalAmount,
        
                    
        CURRENT_TIMESTAMP AS orderTime,
        
                       
        'PENDING' AS status,
        
                       
        HOUR(CURRENT_TIMESTAMP) AS hourOfDay,
        
                                           
        CASE 
            WHEN HOUR(CURRENT_TIMESTAMP) BETWEEN 7 AND 9 THEN 1.0
            WHEN HOUR(CURRENT_TIMESTAMP) BETWEEN 10 AND 11 THEN 0.8
            WHEN HOUR(CURRENT_TIMESTAMP) BETWEEN 12 AND 13 THEN 1.0
            WHEN HOUR(CURRENT_TIMESTAMP) BETWEEN 14 AND 16 THEN 0.3
            WHEN HOUR(CURRENT_TIMESTAMP) BETWEEN 17 AND 19 THEN 0.9
            WHEN HOUR(CURRENT_TIMESTAMP) BETWEEN 20 AND 22 THEN 0.5
            ELSE 1
        END AS purchaseProbability,
        
        RAND() AS randomThreshold
        
    FROM TABLE(
        TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
    )
    GROUP BY window_start, window_end
)
WHERE randomThreshold <= purchaseProbability;