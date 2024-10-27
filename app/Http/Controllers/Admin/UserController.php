<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Gender;
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\UserExportRequest;
use App\Http\Requests\Admin\User\UserRequest;
use App\Services\Admin\UserService;
use Excel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(private UserService $userService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(UserRequest $request)
    {
        $role = $request->input('role', 'all');
        $gender = $request->input('gender', 'all');
        $search = $request->input('search', '');
        $limit = $request->input('limit', 10);
        $users = $this->userService->listUsers($role, $search, $gender, $limit);
        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function export(UserExportRequest $request)
    {
        $format = $request->input('format', 'xlsx');
        if ($format === 'pdf') {
            return Excel::download(new UsersExport, 'users.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
        }
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
