<?php

namespace App\Http\Controllers;

use App\Models\TransactionReturn; // Model for the returns table
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Expense;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionReturnController extends Controller
{
    /**
     * Display a listing of the returns.
     */
    public function index()
    {
        $returns = TransactionReturn::with(['product', 'purchase', 'sale', 'expense'])->get();
        return view('returns.index', compact('returns'));
    }

    /**
     * Show the form for creating a new return.
     */
    public function create($id, $type)
    {
        $user = Auth::user();
        $returnData = null;
        $quantity = 0;
        $amount = 0;

        // Retrieve the appropriate data based on the type
        switch ($type) {
            case 'purchase':
                $returnData = $user->purchases()->with('product')->find($id);
                $quantity = $returnData->TotalQuantity ?? 0;
                $amount = $returnData->cost ?? 0;
                break;

            case 'sale':
                $returnData = $user->sales()->with('product')->find($id);
                $quantity = $returnData->TotalQuantity ?? 0;
                $amount = $returnData->final_price ?? 0;
                break;

            case 'expense':
                $returnData = $user->expenses()->with('expenseType')->find($id);
                $amount = $returnData->total_amount ?? 0;
                break;

            default:
                return redirect()->back()->withErrors(['message' => 'Invalid return type.']);
        }

        // Check if data exists; redirect if not found
        if (!$returnData) {
            return redirect()->back()->withErrors(['message' => 'Record not found.']);
        }

        // Prepare the view data
        $viewData = [
            'amount' => $amount,
            'type' => $type,
            'purchase' => $type === 'purchase' ? $returnData : null,
            'sale' => $type === 'sale' ? $returnData : null,
            'expense' => $type === 'expense' ? $returnData : null,
            'product' => $type === 'purchase' || $type === 'sale' ? $returnData->product : null,
            'quantity' => $quantity
        ];

        // Render the Inertia view with the prepared data
        return Inertia::render('TransactionReturn/Create', $viewData);
    }



    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            'return_type' => 'required|in:purchase,sale,expense',
            'max_quantity' => [
                'required_if:return_type,purchase,sale',
                'numeric',
            ],
            'quantity' => [
                'required_if:return_type,purchase,sale',
                'numeric',
                function ($attribute, $value, $fail) use ($request) {
                    if (($request->return_type === 'purchase' || $request->return_type === 'sale') && $value < 1) {
                        $fail('يجب أن يكون ' . $attribute . ' على الأقل 1.');
                    }
                    if ($request->filled('max_quantity') && $value > $request->max_quantity) {
                        $fail('يجب ألا يكون ' . $attribute . ' أكبر من الكمية القصوى.');
                    }
                }
            ],
            'product_id' => 'nullable',
            'purchase_id' => 'required_if:return_type,purchase|nullable',
            'sale_id' => 'required_if:return_type,sale|nullable',
            'expense_id' => 'required_if:return_type,expense|nullable',
            'max_amount' => 'required|numeric|min:1',
            'amount' => 'required_if:return_type,expense|nullable|numeric|min:1|max:' . $request->max_amount,
            'reason' => 'nullable|string',
        ]);
       
        try {
            DB::beginTransaction();
    
            // Create a new transaction return
            $return = new TransactionReturn();
            $return->user_id = Auth::user()->id;
            $return->return_date = now();
            $return->reason = $request->reason;
            $return->status = 'pending';
            $return->return_type = $request->return_type;
            $route = '';
    
            // Switch logic based on return type
            switch ($request->return_type) {
                case 'purchase':
                    $return->purchase_id = $request->purchase_id;
                    $return->quantity = $request->quantity;
                    $return->amount = $request->amount;

                    // update the product 
                    $product = Product::find($request->product_id);
                    $product->decrement('quantity', $request->quantity);
                    $product->save();

                    $route = 'purchases.index';
                    break;
                case 'sale':
                    $return->sale_id = $request->sale_id;
                    $return->quantity = $request->quantity;
                    $return->amount = $request->amount;

                      // update the product 
                      $product = Product::find($request->product_id);
                      $product->increment('quantity', $request->quantity);
                      $product->save();

                    $route = 'sales.index';
                    break;
                case 'expense':
                    $return->expense_id = $request->expense_id;
                    $return->amount = $request->amount;
                    $route = 'expenses.index';
                    break;
            }
    
            $return->save();
    
            DB::commit();
            return to_route($route);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log the error for debugging purposes
            \Log::error('Transaction Return Error: ' . $e->getMessage());
            return redirect()->back()->withErrors(['message' => 'حدث خطأ أثناء معالجة الإرجاع.']);
        }
    }
    

    /**
     * Display the specified return.
     */
    public function show($id)
    {
        $return = TransactionReturn::findOrFail($id);
        return view('returns.show', compact('return'));
    }

    /**
     * Show the form for editing the specified return.
     */
    public function edit($id)
    {
        $return = TransactionReturn::findOrFail($id);
        $products = Product::all();
        $purchases = Purchase::all();
        $sales = Sale::all();
        $expenses = Expense::all();

        return view('returns.edit', compact('return', 'products', 'purchases', 'sales', 'expenses'));
    }

    /**
     * Update the specified return in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:pending,processed,rejected',
            // other fields based on type if needed
        ]);

        $return = TransactionReturn::findOrFail($id);
        $return->status = $request->status;
        $return->save();

        return redirect()->route('returns.index')->with('success', 'Return updated successfully.');
    }

    /**
     * Remove the specified return from storage.
     */
    public function destroy($id)
    {
        $return = TransactionReturn::findOrFail($id);
        $return->delete();

        return redirect()->route('returns.index')->with('success', 'Return deleted successfully.');
    }
}
