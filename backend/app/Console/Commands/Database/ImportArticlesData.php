<?php

namespace App\Console\Commands\Database;

use Doctrine\DBAL\Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Schema;
use Symfony\Component\Finder\SplFileInfo;

class ImportArticlesData extends Command
{
    protected $signature = 'articles:import';

    protected $description = 'Import articles data from JSON files';

    public function handle(): void
    {
        collect(File::allFiles(database_path('data')))->each(function (SplFileInfo $file) {
            Schema::disableForeignKeyConstraints();
            try {
                $table = Str::remove('.json', $file->getFilename());
                $chunk = 100;
                $start = microtime(true);
                $data  = collect(json_decode($file->getContents()))->transform(fn ($i) => (array) $i);
                DB::table($table)->truncate();
                $data->chunk($chunk)->each(fn ($items) => DB::table($table)->insert($items->toArray()));
                /*-----------------------------------------------------------------*/
                $time    = (int) ((microtime(true) - $start) * 1000);
                $message = '<fg=cyan>'.Str::padRight($table, 45, '.').'</>';
                $color   = $time < 500 ? 'green' : ($time < 1000 ? 'yellow' : 'red');
                $this->info($message."<fg=$color>{$time}ms</>");
            } catch (Exception $e) {
                if (isset($table)) {
                    Log::error($e->getMessage());
                    $this->error("Error importing $table");
                }
            } finally {
                Schema::enableForeignKeyConstraints();
            }
        });
        $this->info('Data imported');
    }
}
