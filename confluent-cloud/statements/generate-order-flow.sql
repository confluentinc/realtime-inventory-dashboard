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
    CAST(productProbability AS DOUBLE) AS productProbability
FROM (
    SELECT 
        *,
        -- Derive productProbability from the selected productId
        CASE productId
            WHEN 1 THEN 0.75  -- Premium Coffee
            WHEN 2 THEN 0.85  -- Onigiri (Tuna)
            WHEN 3 THEN 0.25  -- Artisan Chocolate
            WHEN 4 THEN 0.65  -- Katsu Sando
            WHEN 5 THEN 0.18  -- Fruits Bowl
            WHEN 6 THEN 0.65  -- Egg Sandwich
            WHEN 7 THEN 0.45  -- Chicken Salad
            WHEN 8 THEN 0.75  -- Canned Coffee
            WHEN 9 THEN 0.35  -- Green Tea
            ELSE 0.20         -- Beer
        END AS productProbability,
        
        -- Combined probability for filtering
        purchaseProbability * 
        CASE productId
            WHEN 1 THEN 0.75
            WHEN 2 THEN 0.85
            WHEN 3 THEN 0.25
            WHEN 4 THEN 0.65
            WHEN 5 THEN 0.18
            WHEN 6 THEN 0.65
            WHEN 7 THEN 0.45
            WHEN 8 THEN 0.75
            WHEN 9 THEN 0.35
            ELSE 0.20
        END AS combinedProbability
    FROM (
        SELECT 
            window_start,
            window_end,
            
            CAST(UNIX_TIMESTAMP() * 1000 + FLOOR(RAND() * 1000) AS BIGINT) AS orderId,
            
            'CUST-12345' AS customerId,
            
            -- Weighted product selection based on probability
            -- Cumulative thresholds: sum of probabilities normalized to 1.0
            -- Total weight = 5.08, so each threshold = cumulative_sum / 5.08
            CASE 
                WHEN productRand <= 0.1476 THEN 1   -- Premium Coffee (0.75/5.08)
                WHEN productRand <= 0.3150 THEN 2   -- Onigiri (0.85/5.08)
                WHEN productRand <= 0.3642 THEN 3   -- Artisan Chocolate (0.25/5.08)
                WHEN productRand <= 0.4921 THEN 4   -- Katsu Sando (0.65/5.08)
                WHEN productRand <= 0.5276 THEN 5   -- Fruits Bowl (0.18/5.08)
                WHEN productRand <= 0.6555 THEN 6   -- Egg Sandwich (0.65/5.08)
                WHEN productRand <= 0.7441 THEN 7   -- Chicken Salad (0.45/5.08)
                WHEN productRand <= 0.8917 THEN 8   -- Canned Coffee (0.75/5.08)
                WHEN productRand <= 0.9606 THEN 9   -- Green Tea (0.35/5.08)
                ELSE 10                              -- Beer (0.20/5.08)
            END AS productId,
            
            CAST(1 + FLOOR(RAND() * 5) AS INT) AS quantity,
            
            CAST(10.0 + (RAND() * 90.0) AS DECIMAL(10,2)) AS unitPrice,
            
            CAST((1 + FLOOR(RAND() * 5)) * (10.0 + (RAND() * 90.0)) AS DECIMAL(10,2)) AS totalAmount,
            
            CURRENT_TIMESTAMP AS orderTime,
            
            'PENDING' AS status,
            
            HOUR(CURRENT_TIMESTAMP) AS hourOfDay,
            
            -- Time-based purchase probability
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
            
        FROM (
            SELECT 
                window_start,
                window_end,
                RAND() AS productRand
            FROM TABLE(
                TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '0.5' SECOND)
            )
            GROUP BY window_start, window_end
        )
    )
)
WHERE randomThreshold <= combinedProbability;