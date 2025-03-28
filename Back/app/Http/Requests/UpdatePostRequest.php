<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="PostUpdate",
 *     type="object",
 *     properties={
 *         @OA\Property(property="title", type="string", example="Updated title"),
 *         @OA\Property(property="text", type="string", example="Updated description"),
 *     }
 * )
 */
class UpdatePostRequest extends FormRequest
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
            'title' => 'string',
            'text' => 'string'
        ];
    }
}
