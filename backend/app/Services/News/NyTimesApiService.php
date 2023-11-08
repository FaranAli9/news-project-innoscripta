<?php

namespace App\Services\News;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class NyTimesApiService
{
    public function __construct()
    {
    }

    public function get(string $query, int $page): array
    {
        $response = Http::baseUrl(config('news.new-york-times-api.endpoint'))
            ->withQueryParameters([
                'q'       => $query,
                'page'    => $page,
                'api-key' => config('news.new-york-times-api.api-key'),
            ])
            ->get('svc/search/v2/articlesearch.json')
            ->json();

        return Arr::get($response, 'response.docs', []);

    }
}
