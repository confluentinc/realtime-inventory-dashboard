EXECUTE STATEMENT SET
BEGIN
    INSERT INTO inventory_20260119_1902_test
    SELECT 
    productId,
    nameJa,
    nameEn,
    category,
    0 as shownInStore,
    eventTime AS updatedAt,
    CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
        ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
        END AS inventoryQty,
        CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
        ELSE 0
        END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
            CURRENT_TIMESTAMP AS eventTime,
            1 as productId,
            'プレミアムコーヒー' AS nameJa,
            'Premium Coffee' AS nameEn,
            'Beverages' AS category,
            true as isPurchaseIteration,
            10 as minThreshold,
            80 as maxInventory,
            20 as salesPerHour
        FROM TABLE(
            --- orders emits 20+ msg/s so reducing to 1msg/s
            TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
    productId,
    nameJa,
    nameEn,
    category,
    0 as shownInStore,
    eventTime AS updatedAt,
    CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
        ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
        END AS inventoryQty,
        CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
        ELSE 0
        END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
            CURRENT_TIMESTAMP AS eventTime,
            2 as productId,
            'おにぎり（鮭）' AS nameJa,
            'Onigiri (Tuna)' AS nameEn,
            'Food' AS category,
            true as isPurchaseIteration,
            5 as minThreshold,
            35 as maxInventory,
            20 as salesPerHour
        FROM TABLE(
            --- orders emits 20+ msg/s so reducing to 1msg/s
            TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
    productId,
    nameJa,
    nameEn,
    category,
    0 as shownInStore,
    eventTime AS updatedAt,
    CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
        ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
        END AS inventoryQty,
        CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
        ELSE 0
        END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
            CURRENT_TIMESTAMP AS eventTime,
            3 as productId,
            '職人チョコレート' AS nameJa,
            'Artisan Chocolate' AS nameEn,
            'Confectionery' AS category,
            true as isPurchaseIteration,
            2 as minThreshold,
            200 as maxInventory,
            3 as salesPerHour
        FROM TABLE(
            --- orders emits 20+ msg/s so reducing to 1msg/s
            TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
    productId,
    nameJa,
    nameEn,
    category,
    0 as shownInStore,
    eventTime AS updatedAt,
    CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
        ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
        END AS inventoryQty,
        CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
        ELSE 0
        END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
            CURRENT_TIMESTAMP AS eventTime,
            4 as productId,
            'カツサンド' AS nameJa,
            'Katsu Sando' AS nameEn,
            'Food' AS category,
            true as isPurchaseIteration,
            5 as minThreshold,
            20 as maxInventory,
            7 as salesPerHour
        FROM TABLE(
            --- orders emits 20+ msg/s so reducing to 1msg/s
            TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
    productId,
    nameJa,
    nameEn,
    category,
    0 as shownInStore,
    eventTime AS updatedAt,
    CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
        ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
        END AS inventoryQty,
        CASE 
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
        WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
        ELSE 0
        END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
            CURRENT_TIMESTAMP AS eventTime,
            5 as productId,
            'フルーツボウル' AS nameJa,
            'Fruits Bowl' AS nameEn,
            'Food' AS category,
            true as isPurchaseIteration,
            0 as minThreshold,
            8 as maxInventory,
            3 as salesPerHour
        FROM TABLE(
            --- orders emits 20+ msg/s so reducing to 1msg/s
            TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
        productId,
        nameJa,
        nameEn,
        category,
        0 as shownInStore,
        eventTime AS updatedAt,
        CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
            ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
            END AS inventoryQty,
            CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
            ELSE 0
            END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
            CURRENT_TIMESTAMP AS eventTime,
            6 as productId,
            'たまごサンド' AS nameJa,
            'Egg Sandwich' AS nameEn,
            'Food' AS category,
            true as isPurchaseIteration,
            2 as minThreshold,
            20 as maxInventory,
            9 as salesPerHour
        FROM TABLE(
            --- orders emits 20+ msg/s so reducing to 1msg/s
            TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
        productId,
        nameJa,
        nameEn,
        category,
        0 as shownInStore,
        eventTime AS updatedAt,
        CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
            ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
            END AS inventoryQty,
            CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
            ELSE 0
            END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
        CURRENT_TIMESTAMP AS eventTime,
        7 as productId,
        'チキンサラダ' AS nameJa,
        'Chicken Salad' AS nameEn,
        'Food' AS category,
        true as isPurchaseIteration,
        5 as minThreshold,
        20 as maxInventory,
        10 as salesPerHour
        FROM TABLE(
        --- orders emits 20+ msg/s so reducing to 1msg/s
        TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
        productId,
        nameJa,
        nameEn,
        category,
        0 as shownInStore,
        eventTime AS updatedAt,
        CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
            ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
            END AS inventoryQty,
            CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
            ELSE 0
            END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
        CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
        CURRENT_TIMESTAMP AS eventTime,
        8 as productId,
        '缶コーヒー' AS nameJa,
        'Canned Coffee' AS nameEn,
        'Beverages' AS category,
        true as isPurchaseIteration,
        10 as minThreshold,
        150 as maxInventory,
        15 as salesPerHour
        FROM TABLE(
        --- orders emits 20+ msg/s so reducing to 1msg/s
        TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
        productId,
        nameJa,
        nameEn,
        category,
        0 as shownInStore,
        eventTime AS updatedAt,
        CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
            ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
            END AS inventoryQty,
            CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
            ELSE 0
            END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
        CURRENT_TIMESTAMP AS eventTime,
        9 as productId,
        '緑茶' AS nameJa,
        'Green Tea' AS nameEn,
        'Beverages' AS category,
        true as isPurchaseIteration,
        15 as minThreshold,
        100 as maxInventory,
        10 as salesPerHour
        FROM TABLE(
        --- orders emits 20+ msg/s so reducing to 1msg/s
        TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
    -----
    INSERT INTO inventory_20260119_1902_test
    SELECT 
        productId,
        nameJa,
        nameEn,
        category,
        0 as shownInStore,
        eventTime AS updatedAt,
        CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN maxInventory
            ELSE (maxInventory - ((unixSeconds + 1) % maxInventory))
            END AS inventoryQty,
            CASE 
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < minThreshold THEN 0  
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) < (maxInventory / 2) THEN maxInventory - minThreshold
            WHEN (maxInventory - ((unixSeconds + 1) % maxInventory)) >= (maxInventory / 2) THEN 0
            ELSE 0
            END AS deliveryQty,
    CAST(salesPerHour AS INT) as salesPerHour --- make it nullable
    FROM (
        SELECT window_start, window_end,
            CAST(UNIX_TIMESTAMP() AS INT) AS unixSeconds,
        CURRENT_TIMESTAMP AS eventTime,
        10 as productId,
        'ビール' AS nameJa,
        'Beer' AS nameEn,
        'Beverages' AS category,
        true as isPurchaseIteration,
        15 as minThreshold,
        100 as maxInventory,
        5 as salesPerHour
        FROM TABLE(
        --- orders emits 20+ msg/s so reducing to 1msg/s
        TUMBLE(TABLE examples.marketplace.orders, DESCRIPTOR($rowtime), INTERVAL '1' SECOND)
        )
        GROUP BY window_start, window_end
    );
END;