<?php

namespace App\Traits;

use App\Models\Model;
use Illuminate\Contracts\Auth\Authenticatable;

trait ModelTrait
{
    public function persist($data, $save = true): static
    {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
        if ($save) {
            $this->save();
        }

        return $this;
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        if (property_exists(get_called_class(), 'belongsToClient')) {
            static::addGlobalScope(new ClientScope);
        }
        if (property_exists(get_called_class(), 'belongsToLocation')) {
            static::addGlobalScope(new LocationScope);
        }
        static::saving(function (Model|Authenticatable|Permission|Role $model) {
            $prefix = 'scope_';
            if (property_exists(get_called_class(), 'belongsToClient')) {
                $foreign_key = config('permission.column_names.team_foreign_key');
                if (! array_key_exists($foreign_key, $model->attributes)) {
                    $model->$foreign_key = request($prefix.config('permission.column_names.team_foreign_key'));
                }
            }

            if (property_exists(get_called_class(), 'belongsToLocation')) {
                $foreign_key = 'location_id';
                if (! array_key_exists($foreign_key, $model->attributes)) {
                    $model->$foreign_key = request($prefix.'location_id');
                }
            }
        });
    }
}
