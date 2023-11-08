<?php

namespace App\Http\Controllers\Feed;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FeedPreferenceController extends Controller
{
    public function get()
    {
        $preferences = auth()->user()->preferences;

        return compact('preferences');
    }

    public function update(Request $request)
    {
        $data = $request->only(['categories', 'authors', 'sources']);
        auth()->user()->preferences()->first()->persist($data);

        return response(null, 204);
    }
}
