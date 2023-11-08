<?php

namespace App\Services\News;

use Illuminate\Support\Facades\Http;

class NewsApiService
{
    public function __construct()
    {
    }

    public function get(string $query): array
    {
        $response = Http::baseUrl(config('news.news-api.endpoint'))
            ->withQueryParameters([
                'q'        => $query,
                'language' => 'en',
                'pageSize' => 100,
                'page'     => 1,
                'sortBy'   => 'popularity',
                'apiKey'   => config('news.news-api.api-key'),
            ])
            ->get('everything')
            ->json();

        return $response['articles'];
    }
}
