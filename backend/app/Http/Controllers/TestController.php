<?php

namespace App\Http\Controllers;

use App\Jobs\NyTimes\FetchNyTimesApiArticlesJob;
use App\Models\Category;

class TestController extends Controller
{
    public function index()
    {
        $categories = Category::whereId(1)->get();
        $categories->each(
            fn (Category $category, int $index) => FetchNyTimesApiArticlesJob::dispatch($category)->delay(now()->addSeconds($index * 90))
        );
    }
}
