<?php

namespace App\Jobs\Feed;

use App\Models\Article;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GetUserFeedJob
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private ?string $search;

    private ?array $categories;

    private ?array $sources;

    private ?array $authors;

    private ?array $range;

    /**
     * Create a new job instance.
     */
    public function __construct(?string $search, ?array $categories, ?array $sources, ?array $authors, ?array $range)
    {
        $this->search     = $search;
        $this->categories = $categories;
        $this->sources    = $sources;
        $this->authors    = $authors;
        $this->range      = $range;
        if ($range && count($range) === 2) {
            $this->range = [
                Carbon::parse($range[0])->startOfDay()->toDateTimeString(),
                Carbon::parse($range[1])->endOfDay()->toDateTimeString(),
            ];
        }

    }

    /**
     * Execute the job.
     */
    public function handle(): LengthAwarePaginator
    {
        return Article::search($this->search)
            ->when($this->categories && count($this->categories), fn ($query) => $query->whereIn('category_id', $this->categories))
            ->when($this->sources && count($this->sources), fn ($query) => $query->whereIn('source_id', $this->sources))
            ->when($this->authors && count($this->authors), fn ($query) => $query->whereIn('author_id', $this->authors))
            ->when($this->range && count($this->range) === 2, fn (Builder $query) => $query->whereBetween('published_at', $this->range))
            ->with(['author:id,name', 'source:id,name', 'category:id,name'])
            ->paginate(20);
    }
}
