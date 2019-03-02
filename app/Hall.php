<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    protected $fillable = ['title', 'rows', 'places_in_row'];

    public $timestamps = false;

    public function places() 
    {
      return $this->hasMany('App\Place');
    }

    public function prices() 
    {
      return $this->hasMany('App\PlaceTypePrice');
    }
}
