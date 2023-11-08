<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    protected array $search_fields = [
        'title',
        'summary',
    ];

    protected $casts = [
        'published_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(Source::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeSearch(Builder $query, $search = null): Builder
    {
        if ($search) {
            foreach ($this->search_fields as $field) {
                $query->orWhere($field, 'LIKE', "%$search%");
            }
        }

        return $query;
    }
}
