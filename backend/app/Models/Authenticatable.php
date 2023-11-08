<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Foundation\Auth\User;

abstract class Authenticatable extends User
{
    use ModelTrait;
}
