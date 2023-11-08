<?php

namespace App\Console\Commands\Database;

use Doctrine\DBAL\Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ExportArticlesData extends Command
{
    protected $signature = 'articles:export';

    protected const ONLY = [
        'articles',
        'authors',
        'categories',
        'sources',
    ];

    protected $description = 'Export articles data to JSON files';

    public function handle()
    {
        $path = database_path('data');

        File::deleteDirectory($path);
        File::makeDirectory($path);

        // Get all table names from the database
        try {
            $tables = DB::connection()->getDoctrineSchemaManager()->listTableNames();
        } catch (Exception $e) {
            $this->error('Could not connect to database');

            return 1;
        }
        $count = 0;
        foreach ($tables as $table) {
            if (! in_array($table, self::ONLY)) {
                continue;
            }
            $count++;
            $this->info('Exporting '.$table);
            $filename = $path."/{$table}.json";

            // Fetch data from each table
            $data = DB::table($table)->get();

            // Write data to JSON file
            File::put($filename, $data);
        }

        $this->info($count.' tables exported');
        $this->info('Data exported to JSON files successfully.');
    }
}
