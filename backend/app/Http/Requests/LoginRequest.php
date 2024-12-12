<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array{
        return [
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
        ];
    }

    public function messages(): array{
        return [
            'email.required' => 'The email field is required.',
            'email.email' => 'Please provide a valid email address.',
            'password.required' => 'The password field is required.',
            'password.confirmed' => 'Password confirmation does not match.',
            'password.min' => 'The password must be at least 6 characters long.',
        ];
    }
}
