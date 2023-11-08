<?php

namespace App\Jobs\TheGuardian;

use App\Jobs\Article\SaveArticleJob;
use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SaveTheGuardianArticleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Category $category;

    private Author $author;

    private Source $source;

    private array $data;

    /**
     * Create a new job instance.
     */
    public function __construct(Category $category, Author $author, Source $source, array $data)
    {
        $this->category = $category;
        $this->author   = $author;
        $this->source   = $source;
        $this->data     = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $data   = $this->data;
        $fields = [
            'source_id'    => $this->source->id,
            'author_id'    => $this->author->id,
            'category_id'  => $this->category->id,
            'title'        => $data['webTitle'],
            'link'         => $data['webUrl'],
            'published_at' => Carbon::parse($data['webPublicationDate']),
        ];
        $article = Article::where('title', $data['webTitle'])->where('link', $data['webUrl'])->first() ?? new Article;
        SaveArticleJob::dispatchsync($article, $fields);
    }
}
