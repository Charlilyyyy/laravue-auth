<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService){
    }

    public function register(RegisterRequest $request){
        $validatedData = $request->validated();
        $user = $this->authService->register($validatedData);
        return response()->json([
            'user' => $user
        ],201);
    }

    public function login(LoginRequest $request){
        $validatedData = $request->validated();
        $user = $this->authService->login($validatedData);
        return response()->json([
            'login' => $user
        ],200);
    }

    public function logout(LogoutRequest $request){
        $validatedData = $request->validated();
        $user = $this->authService->logout($request);
        return response()->json([
            'message' => 'Successfully Logged Out'
        ],200);
    }
}
