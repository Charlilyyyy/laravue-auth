<?php

namespace App\Services;
use App\Services\UserService;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class AuthService{
    public function __construct(
        protected UserService $userService,
        protected UserRepository $userRepository){
    }

    public function register(array $data){
        return $this->userService->addUser($data);
    }

    public function login(array $data){

        $user = $this->userRepository->get($data['email']);

        if(!$user) {
            return response()->json([
                'message' => 'User Not Found'
            ], 404);
        }

        if($data['email'] != $user->email || !Hash::check($data['password'],$user->password)){
            return response()->json([
                'message' => 'Wrong Credentials'
            ], 500);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login Succeeded',
            'data' => $this->userRepository->get($data['email']),
            'token' => $token,
        ]);
    }
}
