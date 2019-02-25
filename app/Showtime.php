<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Showtime extends Model
{
    protected $fillable = ['hall_id', 'movie_id', 'start_time'];

    public $timestamps = false;

    public function hall() 
    {
      return $this->belongsTo('App\Hall');
    }

    public function movie() 
    {
      return $this->belongsTo('App\Movie');
    }
}
