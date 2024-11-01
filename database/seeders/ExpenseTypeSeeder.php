<?php

namespace Database\Seeders;

use App\Models\ExpenseType;
use Illuminate\Database\Seeder;

class ExpenseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExpenseType::factory()->create(['name' => 'إيجار']); // Rent
        ExpenseType::factory()->create(['name' => 'مرافق']); // Utilities
        ExpenseType::factory()->create(['name' => 'رواتب']); // Salaries
        ExpenseType::factory()->create(['name' => 'لوازم']); // Supplies
        ExpenseType::factory()->create(['name' => 'متنوع']); // Miscellaneous
    }
}
