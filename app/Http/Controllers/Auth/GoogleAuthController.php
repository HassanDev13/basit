<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function Callback()
    {
        try {
            $user = Socialite::driver('google')->user();
            $current_user = User::where('provider_id', $user->id)->orWhere('email', $user->email)->first();

            if ($current_user) {
                if ($current_user->provider_id === null) {
                    $current_user->provider_id = $user->id;
                    $current_user->save();
                }

                Auth::login($current_user);

                return redirect()->intended('/');
            } else {

                $newUser = User::updateOrCreate(['email' => $user->email], [
                    'name' => $user->name,
                    'avatar' => $user->avatar,
                    'provider' => "google",
                    'provider_id' => $user->id,
                    'token' => $user->token,
                    'refresh_token' => $user->refreshToken,
                    'password' => encrypt('google'),
                    'email_verified_at' => now(),
                ])->assignRole('student');


                Auth::login($newUser);

                return redirect()->intended('/');
            }
        } catch (Exception $e) {
            Log::error('Google login error: ' . $e->getMessage());
            return redirect()->route('login')->with('error', 'Failed to login with Google, please try again.');
        }
    }
}
