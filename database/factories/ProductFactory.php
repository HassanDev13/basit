<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    { 
        return [
            'name' => $this->faker->word,
            'user_id' => 1,
            'price' => $this->faker->randomFloat(2, 1, 100), // Price between 1 and 100
            'cost' => $this->faker->randomFloat(2, 1, 50), 
            'quantity' => $this->faker->numberBetween(1, 100),
        ];
    }
}
