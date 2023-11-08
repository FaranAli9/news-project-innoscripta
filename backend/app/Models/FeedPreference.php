<?php

namespace App\Models;

class FeedPreference extends Model
{
    protected $casts = [
        'categories' => 'json',
        'authors'    => 'json',
        'sources'    => 'json',
    ];
}
