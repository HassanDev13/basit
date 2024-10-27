<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Purchase>
 */
class PurchaseFactory extends Factory
{
    protected $model = Purchase::class;

    public function definition()
    {
        return [
            'product_id' => Product::factory(), // Create a new product for each purchase
            'user_id' => 1,
            'quantity' => $this->faker->numberBetween(1, 10), // Quantity between 1 and 10
            'cost' => $this->faker->randomFloat(2, 1, 50), // Cost
            'purchase_date' => $this->faker->date(),
        ];
    }
}
