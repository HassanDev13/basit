<?php

namespace Database\Factories;

use App\Models\ExpenseType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpenseType>
 */
class ExpenseTypeFactory extends Factory
{
    protected $model = ExpenseType::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word, // Random name for expense type
        ];
    }

    public function withName(string $name)
    {
        return $this->state([
            'name' => $name,
        ]);
    }
}
