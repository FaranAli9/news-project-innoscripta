<?php

namespace App\Http\Controllers\Lookups;

use App\Http\Controllers\Controller;
use App\Models\Source;

class LookupSourcesController extends Controller
{
    public function __invoke()
    {
        $items = Source::get();

        return compact('items');
    }
}
