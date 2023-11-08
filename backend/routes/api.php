<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Feed\FeedController;
use App\Http\Controllers\Feed\FeedPreferenceController;
use App\Http\Controllers\Lookups\LookupAuthorsController;
use App\Http\Controllers\Lookups\LookupCategoriesController;
use App\Http\Controllers\Lookups\LookupSourcesController;
use Illuminate\Support\Facades\Route;
use Tightenco\Ziggy\Ziggy;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('ziggy', fn () => response()->json(new Ziggy));

Route::group(['middleware' => 'guest:api', 'prefix' => 'auth', 'as' => 'auth.'], function () {
    Route::post('login', [LoginController::class, 'login'])->name('login');
    Route::post('register', [RegisterController::class, 'register'])->name('register');
});

Route::group(['middleware' => ['auth:api']], function () {
    Route::group(['prefix' => 'auth', 'as' => 'auth.'], function () {
        Route::get('profile', [ProfileController::class, 'get'])->name('profile.get');
        Route::post('profile', [ProfileController::class, 'post'])->name('profile.update');
    });

    Route::get('feed', [FeedController::class, 'index'])->name('feed.index');
    Route::get('feed/preferences', [FeedPreferenceController::class, 'get'])->name('feed.preferences.get');
    Route::post('feed/preferences', [FeedPreferenceController::class, 'update'])->name('feed.preferences.update');

    Route::group(['prefix' => 'lookups', 'as' => 'lookups.'], function () {
        Route::get('categories', LookupCategoriesController::class)->name('categories');
        Route::get('sources', LookupSourcesController::class)->name('sources');
        Route::get('authors', LookupAuthorsController::class)->name('authors');
    });
});
