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

    public function scopeFilter($query, $filters)
    {
        if ($filters['search'] ?? false) {
            $query->where('id', 'like', '%' . $filters['search'] . '%');
        }
    }
}
