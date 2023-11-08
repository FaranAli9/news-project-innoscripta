<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'name'     => ['required'],
            'email'    => ['required', 'unique:users,email,'.auth()->id()],
            'password' => ['sometimes', 'confirmed'],
        ];
    }
}
