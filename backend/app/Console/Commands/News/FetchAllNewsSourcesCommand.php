<?php

namespace App\Console\Commands\News;

use Illuminate\Console\Command;

class FetchAllNewsSourcesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch:all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command fetches articles from all news data sources';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->call(FetchNewsApiArticlesCommand::class);
        $this->call(FetchTheGuardianArticlesCommand::class);
        $this->call(FetchNewYorkTimesArticlesCommand::class);
    }
}
