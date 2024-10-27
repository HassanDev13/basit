<?php

namespace App\Services\Admin;

use App\Enums\Gender;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class UserService
{
    public function __construct() {}

    public function listUsers(string $role, string $search, string $gender, int $limit = 10)
    {
        $queryBuilder = User::search($search);

        if (!empty($gender) && $gender !== 'all') {
            $queryBuilder->where('gender', $gender);
        }
        if (!empty($role) && $role !== 'all') {
            $queryBuilder->query(function (Builder $builder) use ($role) {
                $builder->whereHasRole($role);
            });
        }
        return $queryBuilder->paginate($limit);
    }
}
