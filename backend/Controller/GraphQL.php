<?php
namespace App\Controller;

use GraphQL\Type\Schema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\ProductInterface;
use App\GraphQL\Types\ClothingProductType;
use App\GraphQL\Types\TechProductType;
use App\GraphQL\Types\ColorAttributeType;
use App\GraphQL\Types\SizeAttributeType;
use App\GraphQL\Types\TechnicalAttributeType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\OrderType;
use App\GraphQL\Types\AttributeValueInputType;
use App\GraphQL\Types\AttributeValueType;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;

/**
 * Main GraphQL Schema class.
 */
class GraphQL
{
    /**
     * Build and return the GraphQL schema.
     *
     * @return Schema The GraphQL schema.
     */
    public static function get(): Schema
    {
        // Define the query type
        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf(ProductInterface::getInstance()),
                    'args' => [
                        'category' => ['type' => Type::string()]
                    ],
                    'resolve' => function ($rootValue, $args) {
                        if (isset($args['category'])) {
                            return Product::findByCategory($args['category']);
                        }
                        return Product::findAll();
                    }
                ],
                'product' => [
                    'type' => ProductInterface::getInstance(),
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())]
                    ],
                    'resolve' => function ($rootValue, $args) {
                        return Product::find($args['id']);
                    }
                ],
                'categories' => [
                    'type' => Type::listOf(CategoryType::getInstance()),
                    'resolve' => function () {
                        return Category::findAll();
                    }
                ],
                'category' => [
                    'type' => CategoryType::getInstance(),
                    'args' => [
                        'name' => ['type' => Type::nonNull(Type::string())]
                    ],
                    'resolve' => function ($rootValue, $args) {
                        return Category::findByName($args['name']);
                    }
                ]
            ]
        ]);
        
        // Define the mutation type
        $mutationType = new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'addToCart' => [
                    'type' => OrderType::getInstance(),
                    'args' => [
                        'productId' => ['type' => Type::nonNull(Type::string())],
                        'quantity' => ['type' => Type::nonNull(Type::int())],
                        'attributes' => ['type' => Type::listOf(AttributeValueInputType::getInstance())]
                    ],
                    'resolve' => function ($rootValue, $args) {
                        $attributes = [];
                        if (isset($args['attributes'])) {
                            foreach ($args['attributes'] as $attr) {
                                $attributes[$attr['name']] = $attr['value'];
                            }
                        }
                        
                        $order = new Order([
                            'productId' => $args['productId'],
                            'quantity' => $args['quantity'],
                            'attributes' => $attributes
                        ]);
                        
                        $order->create();
                        return $order;
                    }
                ],
                // Add the createOrder mutation
                'createOrder' => [
                    'type' => OrderType::getInstance(),
                    'args' => [
                        'productId' => ['type' => Type::nonNull(Type::id())],
                        'quantity' => ['type' => Type::nonNull(Type::int())],
                        'attributes' => ['type' => Type::listOf(AttributeValueInputType::getInstance())]
                    ],
                    'resolve' => function ($rootValue, $args) {
                        $attributes = [];
                        if (isset($args['attributes'])) {
                            foreach ($args['attributes'] as $attr) {
                                $attributes[] = [
                                    'name' => $attr['name'],
                                    'value' => $attr['value']
                                ];
                            }
                        }
                        
                        $order = new Order([
                            'productId' => $args['productId'],
                            'quantity' => $args['quantity'],
                            'attributes' => $attributes
                        ]);
                        
                        if (!$order->create()) {
                            throw new \RuntimeException("Failed to create order.");
                        }
                        
                        return $order;
                    }
                ]
            ]
        ]);
        
        // Return the schema
        return new Schema([
            'query' => $queryType,
            'mutation' => $mutationType,
            'types' => [
                ClothingProductType::getInstance(),
                TechProductType::getInstance(),
                ColorAttributeType::getInstance(),
                SizeAttributeType::getInstance(),
                TechnicalAttributeType::getInstance(),
                AttributeValueType::getInstance()
            ]
        ]);
    }
}