<?php

namespace App\Jobs\NyTimes;

use App\Models\Category;
use App\Services\News\NyTimesApiService;
use App\Traits\DispatchesJobs;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchNyTimesApiArticlesJob implements ShouldQueue
{
    use Dispatchable, DispatchesJobs, InteractsWithQueue, Queueable, SerializesModels;

    private Category $category;

    const PAGES_PER_CATEGORY = 5;

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
        $client   = new NyTimesApiService;
        for ($i = 1; $i <= self::PAGES_PER_CATEGORY; $i++) {
            collect($client->get($category->name, $i))->each(fn ($data) => SaveNyTimesArticleJob::dispatch($category, $data));
        }
    }

    private function get($category): void
    {
    }
}
