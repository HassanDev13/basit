<?php

namespace App\Http\Requests\Admin\User;

use App\Enums\Gender;
use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $availableRoles = Role::pluck('name')->toArray();
        $availableGenders = array_merge(['all'], array_column(Gender::cases(), 'value'));
        $availableRoles = array_merge(['all'], $availableRoles);
        return [
            'role' => [Rule::in($availableRoles)],
            'gender' => [Rule::in($availableGenders)],
            'search' => ['string', 'max:255'],
            'limit' => ['integer', 'min:1'],
        ];
    }
}
