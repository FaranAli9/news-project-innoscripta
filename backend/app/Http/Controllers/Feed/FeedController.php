<?php

namespace App\Http\Controllers\Feed;

use App\Http\Controllers\Controller;
use App\Jobs\Feed\GetUserFeedJob;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function index(Request $request)
    {
        $search     = $request->get('search');
        $categories = $request->get('categories');
        $sources    = $request->get('sources');
        $authors    = $request->get('authors');
        $range      = $request->get('range');

        $articles = $this->run(
            new GetUserFeedJob($search, $categories, $sources, $authors, $range)
        );

        return compact('articles');
    }
}
