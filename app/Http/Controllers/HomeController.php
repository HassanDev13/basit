<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\ExpenseType; // Assuming you have an ExpenseType model for the foreign key relationship
use App\Models\Purchase;
use App\Models\Sale;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request as RequestFacade;
use Route;

class HomeController extends Controller
{
    public function index()
    {
        // Get the current month, year, and day
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        $currentDate = Carbon::now()->day;

        // Calculate total sales by multiplying final_price by quantity
        $totalSales = Auth::user()->sales()
            ->with('returns') // Eager load returns to minimize queries
            ->whereMonth('sale_date', $currentMonth)
            ->whereYear('sale_date', $currentYear)
            ->whereDay('sale_date', '<=', $currentDate)
            ->get()
            ->sum(function ($sale) {
                $returnedQuantity = $sale->returns->sum('quantity');
                $totalQuantity = $sale->quantity - $returnedQuantity;
                return $sale->final_price * $totalQuantity;
            });

        // Calculate total purchases by multiplying cost by quantity
        $totalPurchases = Auth::user()->purchases()
            ->with('returns') // Eager load returns
            ->whereMonth('purchase_date', $currentMonth)
            ->whereYear('purchase_date', $currentYear)
            ->whereDay('purchase_date', '<=', $currentDate)
            ->get()
            ->sum(function ($purchase) {
                $returnedQuantity = $purchase->returns->sum('quantity');
                $totalQuantity = $purchase->quantity - $returnedQuantity;
                return $purchase->cost * $totalQuantity;
            });

        // Calculate total expenses
        $totalExpenses = Auth::user()->expenses()
            ->with('returns') // Eager load returns
            ->whereMonth('expense_date', $currentMonth)
            ->whereYear('expense_date', $currentYear)
            ->whereDay('expense_date', '<=', $currentDate)
            ->get()
            ->sum(function ($expense) {
                $returnedAmount = $expense->returns->sum('amount');
                $totalAmount = $expense->amount - $returnedAmount;
                return $totalAmount;
            });

        // Calculate the gross profit
        $grossProfit = $totalSales - $totalPurchases - $totalExpenses;

        // Calculate the profit margin (in percentage)
        $profitMargin = $totalSales > 0 ? ($grossProfit / $totalSales) * 100 : 0;

        $reports = [
            ['title' => 'إجمالي المبيعات', 'value' => number_format($totalSales, 2) . " دج"],
            ['title' => 'إجمالي المشتريات', 'value' => number_format($totalPurchases, 2) . " دج"],
            ['title' => 'إجمالي المصاريف', 'value' => number_format($totalExpenses, 2) . " دج"],
            ['title' => 'الربح الإجمالي', 'value' => number_format($grossProfit, 2) . " دج"],
            ['title' => 'الهامش الربحي', 'value' => number_format($profitMargin, 2) . " % "],
        ];
        return Inertia::render('Welcome', [
            'reports' => $reports,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'currentMonth' => $currentMonth,
            'currentYear' => $currentYear,
            'currentDate' => $currentDate,
        ]);
    }
}
