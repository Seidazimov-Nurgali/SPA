<?php

namespace App\Http\Controllers\API;

use App\Events\PostUpdated;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Notifications\PostCreatedNotification;

class PostController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/posts",
     *     summary="Get posts",
     *     tags={"Post"},
     *     @OA\Response(
     *         response=200,
     *         description="All items",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Post"))
     *     )
     * )
     */
    public function index()
    {
        $posts = Post::query()
            ->with('user')
            ->filter()
            ->latest()
            ->paginate(request('per_page'))
            ->withQueryString();

        return PostResource::collection($posts);
    }

    /**
     * @OA\Post(
     *     path="/api/posts",
     *     summary="Store",
     *     tags={"Post"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PostStore")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Successfully created",
     *         @OA\JsonContent(ref="#/components/schemas/Post")
     *     )
     * )
     */
    public function store(StorePostRequest $request)
    {
        $post = $request->user()
            ->posts()
            ->create($request->validated());

        $request->user()->notify(new PostCreatedNotification($post));

        return response()->json([
            'message' => 'Successfully created'
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/posts/{post}",
     *     summary="Get post by id",
     *     tags={"Post"},
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Info",
     *         @OA\JsonContent(ref="#/components/schemas/Post")
     *     ),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * @OA\Put(
     *     path="/api/posts/{post}",
     *     summary="Update by id",
     *     tags={"Post"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PostUpdate")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Successfully updated",
     *         @OA\JsonContent(ref="#/components/schemas/Post")
     *     ),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->validated());

        PostUpdated::dispatch($post);
        //event(new PostUpdated($post)); //broadcast();

        return response()->json([
            'message' => 'Successfully updated'
        ], 204);
    }

    /**
     * @OA\Delete(
     *     path="/api/posts/{post}",
     *     summary="Delete by id",
     *     tags={"Post"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Successfully deleted"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json([
            'message' => 'Successfully deleted'
        ], 204);
    }
}
