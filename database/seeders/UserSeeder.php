<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create or update the super admin
        $superAdmin = User::firstOrCreate([
            'email' => 'reda@ocaz.com',
        ], [
            'username' => 'superadministrator',
            'first_name' => 'super',
            'last_name' => 'admin',
            'phone' => '0511111111',
            'gender' => 'Male',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
 
        // Create or update the admin
        $admin = User::firstOrCreate([
            'email' => 'admin@app.com',
        ], [
            'username' => 'admin-user',
            'first_name' => 'admin',
            'last_name' => 'user',
            'phone' => '0522222222',
            'gender' => 'Male',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        // Create or update the regular user
        $regularUser = User::firstOrCreate([
            'email' => 'regular@app.com',
        ], [
            'username' => 'regular-user',
            'first_name' => 'regular',
            'last_name' => 'user',
            'phone' => '0533333333',
            'gender' => 'Male',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        // Assign roles using Laratrust's attachRole method
        $superAdmin->addRole('superadministrator');
        $admin->addRole('administrator');
        $regularUser->addRole('user');
    }
}
