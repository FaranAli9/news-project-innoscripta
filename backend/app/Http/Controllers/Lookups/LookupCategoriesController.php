<?php

namespace App\Http\Controllers\Lookups;

use App\Http\Controllers\Controller;
use App\Models\Category;

class LookupCategoriesController extends Controller
{
    public function __invoke()
    {
        $items = Category::get();

        return compact('items');
    }
}
