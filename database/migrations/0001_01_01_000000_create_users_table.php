<?php

use App\Enums\Gender;
use App\Enums\Provider;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->enum('provider', [Provider::GOOGLE->value, Provider::FACEBOOK->value, Provider::GITHUB->value, Provider::GITLAB->value, Provider::TWITTER->value, Provider::DISCORD->value, Provider::EMAIL->value])->default(Provider::EMAIL->value);
            $table->string('provider_id')->nullable();
            $table->string('token')->nullable();
            $table->string('refresh_token')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('phone')->nullable()->unique();
            $table->text('bio')->nullable();
            $table->string('avatar')->nullable();
            // $table->enum(column: 'gender', [Gender::MALE->value, Gender::FEMALE->value])->default(Gender::MALE->value); // mysql
            $table->string('gender')->default(Gender::MALE->value)
                ->check(function ($column) {
                    return in_array($column, [Gender::MALE->value, Gender::FEMALE->value]);
                });
           

            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            //indexes
            // $table->fullText(['bio'])->nullable();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
