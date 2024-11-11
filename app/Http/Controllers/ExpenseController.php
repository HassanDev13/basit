<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\ExpenseType; // Assuming you have an ExpenseType model for the foreign key relationship
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request as RequestFacade;

class ExpenseController extends Controller
{
    public function index()
    {
        return Inertia::render('Expenses/Index', [
            'filters' => RequestFacade::all('search'),
            'expenses' => Auth::user()->expenses()->with('expenseType') // Eager load the expense type relationship
                ->orderByDesc('id')
                ->filter(RequestFacade::only('search'))
                ->paginate(10)
                ->withQueryString()
                ->through(fn($expense) => [
                    'id' => $expense->id,
                    'amount' => $expense->total_amount,
                    'expense_date' => $expense->expense_date,
                    'status' => $expense->expense_status,
                    'expense_type' => $expense->expenseType ?? 'N/A', // Adjust according to your column name
                ]),
        ]);
    }
    public function show($id)
    {
        $expense = Expense::with(['returns'])->findOrFail($id);

        return Inertia::render('Expenses/Show', [
            'expense' => [
                'id' => $expense->id,
                'amount' => $expense->total_amount,
                'expense_date' => $expense->expense_date,
                'expense_type' => $expense->expenseType ?? 'N/A',
                'status' => $expense->expense_status,
                'returns' => $expense->returns,
            ],
        ]);
    }
    public function create()
    {
        // Fetch available expense types for the form
        $expenseTypes = ExpenseType::all();

        return Inertia::render('Expenses/Create', [
            'expenseTypes' => $expenseTypes,
        ]);
    }

    public function store(Request $request)
    {

        // Define the validation rules
        $rules = [
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date|date_format:Y-m-d|before_or_equal:today',
            'add_type' => ['required', 'boolean'],
        ];

        // Check if a new expense type is being added
        if ($request->add_type) {
            // Validate new expense type for uniqueness
            $rules['new_expense_type'] = 'required|string|max:255|unique:expense_types,name';
        } else {
            // Validate the existing expense type ID
            $rules['expense_type_id'] = 'required|integer|exists:expense_types,id';
        }

        // Validate the request data
        $validatedData = $request->validate($rules);

        // Add user_id to the validated data
        $validatedData['user_id'] = Auth::id();

        // Check if a new expense type was provided
        if ($request->add_type) {
            $newExpenseType = ExpenseType::create([
                'name' => $validatedData['new_expense_type'],
            ]); // Save the new expense type

            // Update expense_type_id to the new expense type's id
            $validatedData['expense_type_id'] = $newExpenseType->id;
        }

        // Create the expense record
        Expense::create($validatedData);

        return to_route('expenses.index');
    }

    public function destroy($id)
    {
        // Find the expense by ID
        $expense = Expense::findOrFail($id);

        // Soft delete the expense
        $expense->delete();

        // Redirect or return a response
        return to_route('expenses.index');
    }
}
