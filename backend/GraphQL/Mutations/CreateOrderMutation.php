<?php
namespace App\GraphQL\Mutations;

use App\Models\Order;
use App\GraphQL\Types\OrderType;
use App\GraphQL\Types\AttributeValueInputType;
use GraphQL\Type\Definition\Type;
use RuntimeException;

class CreateOrderMutation
{
    /**
     * Returns the configuration array for the createOrder mutation.
     *
     * @return array The mutation configuration.
     */
    public static function get(): array
    {
        return [
            'type' => OrderType::getInstance(),  // Return the Order object.
            'args' => [
                'productId'  => Type::nonNull(Type::id()),
                'quantity'   => Type::nonNull(Type::int()),
                'attributes' => Type::nonNull(Type::listOf(AttributeValueInputType::getInstance())),
            ],
            'resolve' => function ($rootValue, array $args): Order {
                $attributes = [];
                if (isset($args['attributes'])) {
                    foreach ($args['attributes'] as $attr) {
                        if (!isset($attr['name']) || !isset($attr['value'])) {
                            throw new RuntimeException("Attribute input must contain both name and value.");
                        }
                        $attributes[] = [
                            'name'  => $attr['name'],
                            'value' => $attr['value'],
                        ];
                    }
                }
                
                $order = new Order([
                    'productId'  => $args['productId'],
                    'quantity'   => $args['quantity'],
                    'attributes' => $attributes,
                ]);
                
                if (!$order->create()) {
                    throw new RuntimeException("Failed to create order.");
                }
                
                return $order;
            },
        ];
    }
}
