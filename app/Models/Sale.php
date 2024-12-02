<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'quantity', 'final_price', 'sale_date'];

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();;
    }

    public function returns()
    {
        return $this->hasMany(TransactionReturn::class);
    }
    public function getTotalQuantityAttribute()
    {
        $returnedQuantity = $this->returns()->sum('quantity');
        return $this->quantity - $returnedQuantity;
    }

    public function getSaleStatusAttribute(): string
    {
        $result = $this->quantity - $this->total_quantity;

        if ($result == $this->quantity) {
            return 'Returned';
        } else if ($result > 0) {
            return 'PartReturned';
        } else {
            return 'Completed';
        }
    }
    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['search'])) {
            $query->where('id', 'like', '%' . $filters['search'] . '%')
                ->orWhereHas('product', function ($subQuery) use ($filters) {
                    $subQuery->where('name', 'like', '%' . $filters['search'] . '%');
                });
        }
    }
}
