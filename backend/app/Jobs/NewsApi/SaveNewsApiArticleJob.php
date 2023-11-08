<?php

namespace App\Jobs\NewsApi;

use App\Jobs\Article\SaveArticleJob;
use App\Jobs\Author\SaveAuthorJob;
use App\Jobs\Source\SaveSourceJob;
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

class SaveNewsApiArticleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Category $category;

    private array $data;

    /**
     * Create a new job instance.
     */
    public function __construct(Category $category, array $data)
    {
        $this->category = $category;
        $this->data     = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $data = $this->data;
        try {
            $authorName = $data['author']                             ?? $data['source']['name'];
            $author     = Author::where('name', $authorName)->first() ?? new Author;
            $author     = SaveAuthorJob::dispatchSync($author, ['name' => $authorName]);
        } catch (\Exception) {
            $author = Author::where('name', $authorName)->first();
        }
        $source = Source::where('name', $data['source']['name'])->first() ?? new Source;
        $source = SaveSourceJob::dispatchSync($source, ['name' => $data['source']['name']]);

        $fields = [
            'source_id'    => $source->id,
            'author_id'    => $author->id,
            'category_id'  => $this->category->id,
            'title'        => $data['title'],
            'summary'      => $data['description'],
            'link'         => $data['url'],
            'image'        => $data['urlToImage'],
            'published_at' => Carbon::parse($data['publishedAt']),
        ];
        $article = Article::where('title', $data['title'])->where('link', $data['url'])->first() ?? new Article;
        SaveArticleJob::dispatchSync($article, $fields);
    }
}
