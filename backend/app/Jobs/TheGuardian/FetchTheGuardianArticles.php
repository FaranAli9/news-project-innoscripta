<?php

namespace App\Jobs\TheGuardian;

use App\Jobs\Author\SaveAuthorJob;
use App\Jobs\Source\SaveSourceJob;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\Services\News\GuardianApiService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchTheGuardianArticles implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Category $category;

    /**
     * Create a new job instance.
     */
    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $category = $this->category;
        $client   = new GuardianApiService;
        $author   = Author::where('name', 'The Guardian')->first() ?? new Author;
        $author   = SaveAuthorJob::dispatchSync($author, ['name' => 'The Guardian']);
        $source   = Source::where('name', 'The Guardian')->first() ?? new Source;
        $source   = SaveSourceJob::dispatchSync($source, ['name' => 'The Guardian']);
        for ($i = 1; $i < 3; $i++) {
            collect($client->get($this->category->name, $i))
                ->each(fn ($data) => SaveTheGuardianArticleJob::dispatch($category, $author, $source, $data));
        }
    }
}
