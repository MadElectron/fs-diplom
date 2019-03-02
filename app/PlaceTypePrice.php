<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlaceTypePrice extends Model
{
    protected $fillable = ['hall_id', 'type', 'price'];

    public $timestamps = false;

    public function hall() 
    {
      return $this->belongsTo('App\Hall');
    }      
}
