<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    public function __construct(protected UserRepository $userRepository){
    }

    public function getUser($id){
        return $this->userRepository->get($id);
    }

    public function addUser(array $data){
        // $data['password'] = bcrypt($data['password']);
        return $this->userRepository->create($data);
    }
}