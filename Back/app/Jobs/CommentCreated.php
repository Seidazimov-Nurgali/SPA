<?php

namespace App\Jobs;

use App\Mail\CommentCreatedMail;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class CommentCreated implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Comment $comment
    ){}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to(User::all())->send(new CommentCreatedMail($this->comment));
    }
}
