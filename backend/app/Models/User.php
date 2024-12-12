<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Boot function to reset the auto-increment ID.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $maxId = DB::table('users')->max('id');
            $nextId = $maxId + 1;

            // Check if any lower ID is available
            $availableId = DB::table('users')
                ->select(DB::raw('id + 1 AS next_id'))
                ->whereRaw('id + 1 NOT IN (SELECT id FROM users)')
                ->orderBy('id')
                ->first();

            if ($availableId && $availableId->next_id < $nextId) {
                $nextId = $availableId->next_id;
            }

            $user->id = $nextId;
        });
    }
}
