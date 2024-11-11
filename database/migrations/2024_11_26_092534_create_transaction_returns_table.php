<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('transaction_returns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Link to users table
            $table->foreignId('purchase_id')->nullable()->constrained('purchases')->onDelete('set null'); // Optional link to purchases
            $table->foreignId('sale_id')->nullable()->constrained('sales')->onDelete('set null'); // Optional link to sales
            $table->foreignId('expense_id')->nullable()->constrained('expenses')->onDelete('set null'); // Optional link to expenses
            $table->integer('quantity')->nullable(); // Used for product returns
            $table->decimal('amount', 8, 2)->nullable(); // Used for expense returns
            $table->text('reason')->nullable();
            $table->enum('status', ['pending', 'processed', 'rejected','done'])->default('done');
            $table->date('return_date');
            $table->enum('return_type', ['purchase', 'sale', 'expense']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('transaction_returns');
    }
};

