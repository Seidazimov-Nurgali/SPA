<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

//Broadcast::routes();

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('post-updated.{id}', function (User $user, int $postId) {
    return $user->id === Post::findOrNew($postId)->user_id;
});
