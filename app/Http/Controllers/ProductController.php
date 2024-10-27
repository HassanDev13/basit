<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request as RequestFacade;
use Illuminate\Http\Request; 
use Redirect;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index', [
            'filters' => RequestFacade::all('search'),
            'products' => Auth::user()->products()->orderByDesc('id')
                ->filter(RequestFacade::only('search'))
                ->paginate(10)
                ->withQueryString()
                ->through(fn($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'cost' => $product->cost,
                    'quantity' => $product->quantity,
                ]),

        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0', // Ensure price is a number and not negative
            'cost' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0', // Ensure quantity is an integer and not negative
        ]);
        $validatedData['user_id'] = Auth::id();
        //dd('store', $validatedData);
        // Create a new product using the validated data
        $product = Product::create($validatedData);

        // Return a response, redirect, or whatever you want to do next
        return redirect()->route('products.index')->with('success', 'Product added successfully.');
    }

    public function show($id)
    {
        // Show a single product
    }

    public function edit(Product $product)
    {

        return Inertia::render('Products/Edit', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'cost' => $product->cost,
                'quantity' => $product->quantity,
            ],
        ]);
    }

    public function update(Request $request, Product $product)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0', // Ensure price is a number and not negative
            'cost' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0', // Ensure quantity is an integer and not negative
        ]);

        // Update the product with the validated data
        $product->update($validatedData);

        // Redirect back with a success message
        return Redirect::back()->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return Redirect::back()->with('success', 'Organization deleted.');
    }
}
