<?php

namespace App\Services;
use App\Services\UserService;

class AuthService{
    public function __construct(protected UserService $userService){
    }

    public function registerUser(array $data){
        return $this->userService->addUser($data);
    }
}
