<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function get($email){
        return User::where('email',$email)->first();
    }

    public function create(array $data){
        return User::create($data);
    }
}
