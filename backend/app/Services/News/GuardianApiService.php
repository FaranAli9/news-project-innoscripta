<?php

namespace App\Services\News;

use Illuminate\Support\Facades\Http;

class GuardianApiService
{
    public function __construct()
    {
    }

    public function get(string $query, int $page): array
    {
        $response = Http::baseUrl(config('news.guardian-api.endpoint'))
            ->withQueryParameters([
                'q'         => $query,
                'lang'      => 'en',
                'page-size' => 50,
                'page'      => $page,
                'api-key'   => config('news.guardian-api.api-key'),
            ])
            ->get('search')
            ->json();

        return $response['response']['results'];
    }
}
