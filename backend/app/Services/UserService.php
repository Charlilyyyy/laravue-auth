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
        return $this->userRepository->create($data);
    }
}
