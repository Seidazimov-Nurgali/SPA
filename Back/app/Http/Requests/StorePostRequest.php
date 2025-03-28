<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="PostStore",
 *     type="object",
 *     required={"title", "text"},
 *     properties={
 *         @OA\Property(property="title", type="string", example="New title"),
 *         @OA\Property(property="text", type="string", example="New description"),
 *     }
 * )
 */
class StorePostRequest extends FormRequest
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
            'title' => 'required|string',
            'text' => 'required|string'
        ];
    }
}
