<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'created_at' => 'date',
            'sortBy' => Rule::in(['price']),
            'sortOrder' => Rule::in(['asc', 'desc'])
        ];
    }

    public function messages(): array
    {
        return [
            'sortBy' => "'sortBy' поддерживает только 'price'",
            'sortOrder' => "'sortOrder' поддерживает только 'desc' и 'asc'"
        ];
    }
}
