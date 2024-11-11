<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionReturn extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'product_id',
        'purchase_id',
        'sale_id',
        'expense_id',
        'quantity',
        'amount',
        'reason',
        'status',
        'return_date',
        'return_type',
    ];

    /**
     * Relationship with the User model
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship with the Product model (for product returns)
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Relationship with the Purchase model (for purchase returns)
     */
    public function purchase()
    {
        return $this->belongsTo(Purchase::class);
    }

    /**
     * Relationship with the Sale model (for sale returns)
     */
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    /**
     * Relationship with the Expense model (for expense returns)
     */
    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

    /**
     * Check if the return is related to a purchase.
     */
    public function isPurchaseReturn()
    {
        return $this->return_type === 'purchase';
    }

    /**
     * Check if the return is related to a sale.
     */
    public function isSaleReturn()
    {
        return $this->return_type === 'sale';
    }

    /**
     * Check if the return is related to an expense.
     */
    public function isExpenseReturn()
    {
        return $this->return_type === 'expense';
    }
}
