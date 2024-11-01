<?php

namespace App\Providers;

use Artisan;
use Illuminate\Support\Facades\DB;
use Native\Laravel\Facades\Window;
use Native\Laravel\Contracts\ProvidesPhpIni;

class NativeAppServiceProvider implements ProvidesPhpIni
{
    /**
     * Executed once the native application has been booted.
     * Use this method to open windows, register global shortcuts, etc.
     */
    public function boot(): void
    {
        if (DB::table('users')->count() === 0) {
            // Run native:db:seed command
            Artisan::call('native:db:seed');
        }
        Window::open();
    }

    /**
     * Return an array of php.ini directives to be set.
     */
    public function phpIni(): array
    {
        return [
        ];
    }
}
