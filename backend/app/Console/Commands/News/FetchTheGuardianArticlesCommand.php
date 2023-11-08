<?php

namespace App\Console\Commands\News;

use App\Jobs\TheGuardian\FetchTheGuardianArticles;
use App\Models\Category;
use Illuminate\Console\Command;

class FetchTheGuardianArticlesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch:guardian';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch articles from Guardian API';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $categories = Category::get();
        $categories->each(fn (Category $category) => FetchTheGuardianArticles::dispatch($category));
        $this->info('Article fetching from The Guardian has been queued. It should take less than 1 minute');
    }
}
