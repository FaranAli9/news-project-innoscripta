<?php

namespace App\Jobs\NyTimes;

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
use Illuminate\Support\Arr;
use Str;

class SaveNyTimesArticleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Category $category;

    private array $data;

    const IMAGE_BASE_URL = 'https://www.nytimes.com/';

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
        $data       = $this->data;
        $authorName = Str::remove('By ', $data['byline']['original'], false);

        $author = Author::where('name', $authorName)->first() ?? new Author;
        SaveAuthorJob::dispatchSync($author, ['name' => $authorName]);

        $source = Source::where('name', $data['source'])->first() ?? new Source;
        SaveSourceJob::dispatchSync($source, ['name' => $data['source']]);

        $fields = [
            'source_id'    => $source->id,
            'author_id'    => $author->id,
            'category_id'  => $this->category->id,
            'title'        => Arr::get($data, 'headline.main'),
            'summary'      => Arr::get($data, 'lead_paragraph'),
            'link'         => Arr::get($data, 'web_url'),
            'image'        => Arr::get($data, 'multimedia.0.url') ? self::IMAGE_BASE_URL.Arr::get($data, 'multimedia.0.url') : null,
            'published_at' => Carbon::parse($data['pub_date']),
        ];
        $article = Article::where('title', $fields['title'])->where('link', $fields['link'])->first() ?? new Article;
        SaveArticleJob::dispatch($article, $fields);
    }
}
