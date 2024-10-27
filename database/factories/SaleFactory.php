<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    protected $model = Sale::class;

    public function definition()
    {
        return [
            'product_id' => Product::factory(), // Create a new product for each sale
            'user_id' => 1,
            'quantity' => $this->faker->numberBetween(1, 10), // Quantity between 1 and 10
            'final_price' => $this->faker->randomFloat(2, 1, 100), // Final price
            'sale_date' => $this->faker->date(),
        ];
    }
}
