<?php
namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Order;
use App\GraphQL\Types\AttributeValueType;
use App\GraphQL\Types\ProductInterface;

class OrderType extends ObjectType
{
    private static $instance;

    public static function getInstance(): self
    {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct()
    {
        parent::__construct([
            'name'   => 'Order',
            'fields' => [
                'id' => [
                    'type'    => Type::string(),
                    'resolve' => function(Order $order) {
                        return $order->getId();
                    }
                ],
                'productId' => [
                    'type'    => Type::nonNull(Type::string()),
                    'resolve' => function(Order $order) {
                        return $order->getProductId();
                    }
                ],
                'quantity' => [
                    'type'    => Type::nonNull(Type::int()),
                    'resolve' => function(Order $order) {
                        return $order->getQuantity();
                    }
                ],
                'attributes' => [
                    'type'    => Type::listOf(AttributeValueType::getInstance()),
                    'resolve' => function(Order $order) {
                        return $order->getAttributes();
                    }
                ],
                '__typename' => [
                    'type'    => Type::string(),
                    'resolve' => function() {
                        return 'Order';
                    }
                ],
                'product' => [
                    'type'    => ProductInterface::getInstance(),
                    'resolve' => function(Order $order) {
                        return \App\Models\Product::find($order->getProductId());
                    }
                ]
            ]
        ]);
    }
}
