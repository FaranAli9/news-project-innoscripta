<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\FeedPreference;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name'  => 'Faran Ali',
            'email' => 'faran@gmail.com',
        ]);
        (new FeedPreference)->persist(['user_id' => $user->id, 'categories' => [], 'authors' => [], 'sources' => []]);

        $this->call([
            CategorySeeder::class,
        ]);
    }
}
