<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'role:admin|superadministrator']], function () {
    Route::get("/dashboard", DashboardController::class)->name("admin.dashboard");
    Route::prefix("account")->group(function () {
        Route::get("/profile", [ProfileController::class, "show"])->name("admin.profile");
        Route::patch("/profile", [ProfileController::class, "updateProfile"])->name("admin.profile.update");
        Route::patch("/profile/update-avatar", [ProfileController::class, "updateAvatar"])->name("admin.profile.update-avatar");
    });


    Route::get('/users/export', [UserController::class, 'export'])
        ->name('admin.users.export');
    Route::resource('users', UserController::class)->except([
        'show'
    ])->names([
        'index' => 'admin.users.index',
        'create' => 'admin.users.create',
        'store' => 'admin.users.store',
        'edit' => 'admin.users.edit',
        'update' => 'admin.users.update'
    ]);
});
