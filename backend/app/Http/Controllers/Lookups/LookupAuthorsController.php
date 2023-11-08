<?php

namespace App\Http\Controllers\Lookups;

use App\Http\Controllers\Controller;
use App\Models\Author;

class LookupAuthorsController extends Controller
{
    public function __invoke()
    {
        $items = Author::get();

        return compact('items');
    }
}
