<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = ['expense_type_id', 'amount', 'expense_date','user_id'];

    public function expenseType()
    {
        return $this->belongsTo(ExpenseType::class);
    }

    public function scopeFilter($query, $filters)
    {
        if ($filters['search'] ?? false) {
            $query->where('id', 'like', '%' . $filters['search'] . '%');
        }
    }
}
