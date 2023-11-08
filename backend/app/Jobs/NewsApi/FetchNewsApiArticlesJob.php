<?php

namespace App\Jobs\NewsApi;

use App\Models\Category;
use App\Services\News\NewsApiService;
use App\Traits\DispatchesJobs;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchNewsApiArticlesJob implements ShouldQueue
{
    use Dispatchable, DispatchesJobs, InteractsWithQueue, Queueable, SerializesModels;

    private NewsApiService $client;

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
        $client   = new NewsApiService;
        collect($client->get($this->category->name))->each(fn ($data) => SaveNewsApiArticleJob::dispatch($category, $data));
    }
}
