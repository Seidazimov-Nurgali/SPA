<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    //'prefix' => 'V1',
    //'as' => 'api.',
    //'namespace' => 'API\V1',
    'middleware' => 'auth:sanctum'
], function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/posts', \App\Http\Controllers\API\PostController::class);
    Route::apiResource('/comments', \App\Http\Controllers\API\CommentController::class);
});
