<?php

return [
    'news-api' => [
        'endpoint' => 'https://newsapi.org/v2',
        'api-key'  => env('NEWSAPI_KEY'),
    ],
    'guardian-api' => [
        'endpoint' => 'https://content.guardianapis.com',
        'api-key'  => env('GUARDIAN_API_KEY'),
    ],
    'new-york-times-api' => [
        'endpoint' => 'https://api.nytimes.com',
        'api-key'  => env('NYTIMES_KEY'),
    ],
];
