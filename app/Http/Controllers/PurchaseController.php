<?php

namespace App\Http\Controllers;

use App\Enums\PurchaseStatus;
use App\Models\Product;
use App\Models\Purchase;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request as RequestFacade;

class PurchaseController extends Controller
{
    public function index()
    {
        return Inertia::render('Purchases/Index', [
            'filters' => RequestFacade::all('search'),
            'purchases' => Auth::user()->purchases()->with('product') // Eager load the product relationship
                ->orderByDesc('id')
                ->filter(RequestFacade::only('search'))
                ->paginate(10)
                ->withQueryString()
                ->through(fn($purchase) => [
                    'id' => $purchase->id,
                    'quantity' => $purchase->quantity,
                    'cost' => $purchase->cost, // Corrected 'cost'
                    'purchase_date' => $purchase->purchase_date,
                    'status' => $purchase->status,
                    'product' => $purchase->product ?? 'N/A', // Now eager-loaded correctly
                ]),
        ]);
    }

    public function create()
    {
        $product = Auth::user()->products;

        return Inertia::render(
            'Purchases/Create',
            [
                'products' => $product,
            ]
        );
    }

    public function store(Request $request)
    {

        $rules = [
            'addNewProduct' => 'required|boolean',
            'quantity' => 'required|integer|min:1',
            'cost' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'purchase_date' => 'required|date|date_format:Y-m-d|before_or_equal:today',
        ];

        // Validate additional fields based on the value of addNewProduct
        if ($request->addNewProduct) {
            $rules['name'] = 'required|string|max:255';
        } else {
            $rules['product_id'] = 'required|integer|exists:products,id';
        }
        $validatedData = $request->validate($rules);
        $validatedData['user_id'] = Auth::id();

        // Handle new product creation or update existing product's quantity
        if ($request->addNewProduct) {
            $product = Product::create([
                'name' => $validatedData['name'],
                'user_id' => $validatedData['user_id'],
                'price' => $validatedData['price'],
                'cost' => $validatedData['cost'],
                'quantity' => $validatedData['quantity'],
            ]);
            $validatedData['product_id'] = $product->id;
        } else {
            $product = Product::findOrFail($validatedData['product_id']);
            $product->increment('quantity', $validatedData['quantity']);
        }

        Auth::user()->purchases()->create($validatedData);

        return to_route('purchases.index');
    }

  

    public function destroy($id)
    {
        // Find the purchase by ID
        $purchase = Purchase::findOrFail($id);
        
        $purchase->status = PurchaseStatus::Canceled;
        
        $product = $purchase->product;
        if ($product) {
            $product->decrement('quantity', $purchase->quantity); 

        }
        
        // Save the updated purchase
        $purchase->save();
    
        // Redirect or return a response
        return to_route('purchases.index');
    }
}
