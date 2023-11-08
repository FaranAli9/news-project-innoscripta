<?php

namespace App\Jobs\Model;

use App\Models\Authenticatable;
use App\Models\Model;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SaveModelJob
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Model|Authenticatable $model;

    private array $data;

    /**
     * Create a new job instance.
     */
    public function __construct(Model|Authenticatable $model, array $data)
    {
        $this->model = $model;
        $this->data  = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): Model|Authenticatable
    {
        return $this->model->persist($this->data);
    }
}
