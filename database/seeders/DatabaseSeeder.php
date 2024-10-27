<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            LaratrustSeeder::class,
            UserSeeder::class,
            LanguageLinesSeeder::class,

            ExpenseTypeSeeder::class,
            // ProductSeeder::class,
            // SaleSeeder::class,
            // PurchaseSeeder::class,
            // ExpenseSeeder::class,
        ]);
      
    }
}
