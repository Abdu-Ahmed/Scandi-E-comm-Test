<?php
namespace App\Models;

use RuntimeException;
use PDOException;

/**
 * Order model.
 */
class Order extends Model
{
    /**
     * @var string|null The order ID.
     */
    protected ?string $id;
    
    /**
     * @var string The product ID.
     */
    protected string $productId;
    
    /**
     * @var int The quantity.
     */
    protected int $quantity;
    
    /**
     * @var array The attributes.
     */
    protected array $attributes;
    
    /**
     * Constructor.
     *
     * @param array $data Order data.
     */
    public function __construct(array $data = [])
    {
        parent::__construct();
        
        if (!empty($data)) {
            $this->id = $data['id'] ?? null;
            $this->productId = $data['productId'];
            $this->quantity = $data['quantity'];
            $this->attributes = $data['attributes'] ?? [];
        }
    }
    
    /**
     * Create a new order.
     * 
     * @return bool Whether the order was created successfully.
     */
    public function create(): bool
    {
        try {
            $stmt = $this->db->prepare(
                "INSERT INTO orders (product_id, quantity, attributes) VALUES (:product_id, :quantity, :attributes)"
            );
            $success = $stmt->execute([
                ':product_id' => $this->productId,
                ':quantity'   => $this->quantity,
                ':attributes' => json_encode($this->attributes),
            ]);
            
            if ($success) {
                $this->id = $this->db->lastInsertId();
            }
            
            return $success;
        } catch (PDOException $e) {
            error_log("Error creating order: " . $e->getMessage());
            throw new RuntimeException("Failed to create order: " . $e->getMessage());
        }
    }
    
    /**
     * Get the order ID.
     * 
     * @return string|null
     */
    public function getId(): ?string
    {
        return $this->id;
    }
    
    /**
     * Get the product ID.
     * 
     * @return string
     */
    public function getProductId(): string
    {
        return $this->productId;
    }
    
    /**
     * Get the quantity.
     * 
     * @return int
     */
    public function getQuantity(): int
    {
        return $this->quantity;
    }
    
    /**
     * Get the order attributes.
     * 
     * @return array
     */
    public function getAttributes(): array
    {
        return $this->attributes;
    }
    
    /**
     * Convert order to array.
     * 
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'productId' => $this->getProductId(),
            'quantity' => $this->getQuantity(),
            'attributes' => $this->getAttributes(),
            '__typename' => 'Order'
        ];
    }
    
    /**
     * Get the table name.
     * 
     * @return string
     */
    protected static function tableName(): string
    {
        return 'orders';
    }
    
    /**
     * Create an order from database data.
     * 
     * @param array $data
     * @return self
     */
    protected static function hydrate(array $data): self
    {
        $orderData = [
            'id'        => $data['id'],
            'productId' => $data['product_id'],
            'quantity'  => $data['quantity'],
            'attributes'=> json_decode($data['attributes'], true)
        ];
        
        return new static($orderData);
    }
}
