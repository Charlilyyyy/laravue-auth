<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function get($id){
        return User::find($id);
    }

    public function create(array $data){
        return User::create($data);
    }
}
