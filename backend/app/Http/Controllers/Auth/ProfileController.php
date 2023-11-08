<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ProfileRequest;

class ProfileController extends Controller
{
    public function get()
    {
        $user = auth()->user();

        return compact('user');
    }

    public function post(ProfileRequest $request)
    {
        $data = $request->validated();
        if ($request->has('password')) {
            $data['password'] = bcrypt($data['password']);
        }
        $user = auth()->user();
        $user->persist($data);

        return compact('user');
    }
}
