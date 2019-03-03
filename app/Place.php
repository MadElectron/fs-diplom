<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = ['hall_id', 'type', 'row_number', 'number'];

    public $timestamps = false;

    public function hall() 
    {
      return $this->belongsTo('App\Hall');
    }   

    // public function ticket() 
    // {
    //   return $this->belongsTo('App\Ticket');
    // }        
}
