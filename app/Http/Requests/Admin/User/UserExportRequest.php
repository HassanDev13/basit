<?php

namespace App\Http\Requests\Admin\User;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserExportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {

        return [
            'format' => [Rule::in(['xlsx', 'pdf'])],
        ];
    }
}
