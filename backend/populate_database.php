<?php

require __DIR__ . '/src/bootstrap.php';

use App\Database\Connection;

try {
    $db = Connection::getInstance();
    
    $json = file_get_contents(__DIR__ . '/data.json');
    if ($json === false) {
        throw new Exception('Unable to read data.json file');
    }
    
    $data = json_decode($json, true);
    if ($data === null) {
        throw new Exception('Invalid JSON format in data.json');
    }

    // Start transaction
    $db->beginTransaction();

    // Optional: Clear existing data (uncomment if you want to start fresh)
    // $db->exec('SET FOREIGN_KEY_CHECKS = 0');
    // $db->exec('TRUNCATE TABLE prices');
    // $db->exec('TRUNCATE TABLE attribute_items');
    // $db->exec('TRUNCATE TABLE attributes');
    // $db->exec('TRUNCATE TABLE products');
    // $db->exec('TRUNCATE TABLE categories');
    // $db->exec('SET FOREIGN_KEY_CHECKS = 1');

    // Insert categories
    foreach ($data['data']['categories'] as $category) {
        $stmt = $db->prepare("INSERT IGNORE INTO categories (name, __typename) VALUES (:name, :typename)");
        $stmt->execute([
            ':name' => $category['name'],
            ':typename' => $category['__typename'],
        ]);
    }

    // Insert products
    foreach ($data['data']['products'] as $product) {
        $stmt = $db->prepare("INSERT IGNORE INTO products (id, name, inStock, gallery, description, category, brand, __typename) 
                             VALUES (:id, :name, :inStock, :gallery, :description, :category, :brand, :typename)");
        $stmt->execute([
            ':id' => $product['id'],
            ':name' => $product['name'],
            ':inStock' => $product['inStock'],
            ':gallery' => json_encode($product['gallery']),
            ':description' => $product['description'],
            ':category' => $product['category'],
            ':brand' => $product['brand'],
            ':typename' => $product['__typename'],
        ]);

        // Insert attributes
        foreach ($product['attributes'] as $attribute) {
            $stmt = $db->prepare("INSERT IGNORE INTO attributes (id, product_id, name, type, __typename) 
                                 VALUES (:id, :product_id, :name, :type, :typename)");
            $stmt->execute([
                ':id' => $attribute['id'],
                ':product_id' => $product['id'],
                ':name' => $attribute['name'],
                ':type' => $attribute['type'],
                ':typename' => $attribute['__typename'],
            ]);

            // Insert attribute items
            foreach ($attribute['items'] as $item) {
                $stmt = $db->prepare("INSERT IGNORE INTO attribute_items (id, attribute_id, displayValue, value, __typename) 
                                    VALUES (:id, :attribute_id, :displayValue, :value, :typename)");
                $stmt->execute([
                    ':id' => $item['id'],
                    ':attribute_id' => $attribute['id'],
                    ':displayValue' => $item['displayValue'],
                    ':value' => $item['value'],
                    ':typename' => $item['__typename'],
                ]);
            }
        }

        // Insert prices
        foreach ($product['prices'] as $price) {
            $stmt = $db->prepare("INSERT IGNORE INTO prices (product_id, amount, currency_label, currency_symbol, __typename) 
                                VALUES (:product_id, :amount, :currency_label, :currency_symbol, :typename)");
            $stmt->execute([
                ':product_id' => $product['id'],
                ':amount' => $price['amount'],
                ':currency_label' => $price['currency']['label'],
                ':currency_symbol' => $price['currency']['symbol'],
                ':typename' => $price['__typename'],
            ]);
        }
    }

    // Commit transaction
    $db->commit();
    echo "Database populated successfully!\n";

} catch (Exception $e) {
    // Rollback transaction on error
    if (isset($db)) {
        $db->rollBack();
    }
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . " Line: " . $e->getLine() . "\n";
}