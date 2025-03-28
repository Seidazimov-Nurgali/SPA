<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

/**
 * @OA\Schema(
 *     schema="Post",
 *     type="object",
 *     title="Post",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="title", type="string", example="Title"),
 *         @OA\Property(property="text", type="string", example="Text"),
 *         @OA\Property(property="created_at", type="string", format="date-time"),
 *         @OA\Property(property="updated_at", type="string", format="date-time"),
 *     }
 * )
 */
class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

//    protected $dispatchesEvents = [
//        'created' => PostUpdated::class
//    ];
    protected $fillable = ['user_id', 'title', 'text', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function scopeFilter(Builder $query)
    {
        if (request()->has('search')) {
            $query->where('title', 'LIKE', '%'. request('search'). '%')
                ->orWhere('text', 'LIKE', '%'. request('search'). '%');
        }

        if (request()->has('sortBy')) {
            $query->orderBy(request('sortBy'), request('sortOrder') ?? 'asc');
        }
    }
}
