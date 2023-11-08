<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\FeedPreference;
use App\Models\User;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data             = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user             = (new User)->persist($data);
        (new FeedPreference)->persist(['user_id' => $user->id, 'categories' => [], 'authors' => [], 'sources' => []]);

        $token = auth()->attempt($request->only(['email', 'password']));

        return compact('token');

    }
}
