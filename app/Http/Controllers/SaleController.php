<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request as RequestFacade;

class SaleController extends Controller
{
    public function index()
    {
        return Inertia::render('Sales/Index', [
            'filters' => RequestFacade::all('search'),
            'sales' => Auth::user()->sales()->with('product') // Eager load the product relationship
                ->orderByDesc('id')
                ->filter(RequestFacade::only('search'))
                ->paginate(10)
                ->withQueryString()
                ->through(fn($sale) => [
                    'id' => $sale->id,
                    'quantity' => $sale->quantity,
                    'final_price' => $sale->final_price,
                    'sale_date' => $sale->sale_date,
                    'status' => $sale->status,
                    'product' => $sale->product ?? 'N/A',
                ]),
        ]);
    }

    public function create()
    {
        $product = Auth::user()->products;

        return Inertia::render(
            'Sales/Create',
            [
                'products' => $product,
            ]
        );
    }

    public function store(Request $request)
    {
       
        $rules = [
            'final_price' => 'required|numeric|min:0',
            'sale_date' => 'required|date|date_format:Y-m-d|before_or_equal:today',
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => [
                'required',
                'integer',
                'min:1',
                // Add a custom rule to validate the quantity based on the product's available stock
                function ($attribute, $value, $fail) use ($request) {
                    $product = Product::find($request->product_id);
                    if ($product && $value > $product->quantity) {
                        $fail('الكمية المطلوبة تتجاوز المخزون المتاح.');
                    }
                },
            ],
        ];
    
        // Validate the request data
        $validatedData = $request->validate($rules);
    
        // Add user_id to the validated data
        $validatedData['user_id'] = Auth::id();
    
        // Find the product and decrement its quantity
        $product = Product::findOrFail($validatedData['product_id']);
        $product->decrement('quantity', $validatedData['quantity']);
    
        // Create the sale record
        Auth::user()->sales()->create($validatedData);
    
        return to_route('sales.index');
    
    }

    public function destroy($id)
    {
        // Find the sale by ID
        $sale = Sale::findOrFail($id);
        
        // Change the status to 'canceled'
        $sale->status = 'canceled';
        
        // Find the related product and increment its quantity back
        $product = $sale->product;
        if ($product) {
            $product->increment('quantity', $sale->quantity);
        }

        // Save the updated sale
        $sale->save();

        // Redirect or return a response
        return to_route('sales.index');
    }
}
