<?php

namespace App\Models;

use App\Traits\ModelTrait;

abstract class Model extends \Illuminate\Database\Eloquent\Model
{
    use ModelTrait;
}
