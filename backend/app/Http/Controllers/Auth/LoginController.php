<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        if ($token = auth()->attempt($request->validated())) {
            return compact('token');
        }

        throw ValidationException::withMessages(['email' => 'These credentials do not match our records']);
    }

    private function guard()
    {
        return auth()->guard('api');
    }
}
