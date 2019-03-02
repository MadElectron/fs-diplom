<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = ['title', 'duration'];

    public $timestamps = false;

    public function showtimes() 
    {
      return $this->hasMany('App\Showtime');
    }
}
