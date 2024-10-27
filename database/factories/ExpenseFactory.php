<?php

namespace Database\Factories;

use App\Models\Expense;
use App\Models\ExpenseType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    protected $model = Expense::class;

    public function definition()
    {
        return [
            'expense_type_id' => ExpenseType::factory(), // Create a new expense type for each expense
            'user_id' => 1,
            'amount' => $this->faker->randomFloat(2, 1, 100), // Amount between 1 and 100
            'expense_date' => $this->faker->date(),
        ];
    }
}
