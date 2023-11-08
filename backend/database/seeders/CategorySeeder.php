<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
        foreach ($categories as $category) {
            (new Category)->persist([
                'name' => $category,
            ]);
        }
    }
}
