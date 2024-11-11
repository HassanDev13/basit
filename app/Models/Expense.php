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

    public function returns(){
        return $this->hasMany(TransactionReturn::class);
    }

    public function getExpenseStatusAttribute(): string
    {
        $result = $this->amount - $this->total_amount ;

        if ($result == $this->amount) {
            return 'Returned';
        } else if ($result > 0) {
            return 'PartReturned';
        } else {
            return 'Completed';
        }
    }
    public function getTotalAmountAttribute(){
        $returnedAmount = $this->returns()->sum('amount');
        return $this->amount - $returnedAmount;
    }

    public function scopeFilter($query, $filters)
    {
        if ($filters['search'] ?? false) {
            $query->where('id', 'like', '%' . $filters['search'] . '%');
        }
    }
}
