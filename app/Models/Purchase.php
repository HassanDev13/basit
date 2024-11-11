<?php

namespace App\Models;

use App\Enums\PurchaseStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'quantity', 'cost', 'purchase_date', 'status'];

    protected $casts = [
        'status' => PurchaseStatus::class,
    ];
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

    public function getPurchaseStatusAttribute(): string
    {
        $result = $this->quantity - $this->total_quantity ;

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
        if ($filters['search'] ?? false) {
            $query->where('id', 'like', '%' . $filters['search'] . '%');
        }
    }
}
