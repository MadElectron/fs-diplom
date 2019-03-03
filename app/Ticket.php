<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = ['showtime_id', 'qr_code', 'price', 'date'];

    public $timestamps = false;

    public function showtime() 
    {
      return $this->hasOne('App\Showtime');
    }        

    public function places()
    {
      return $this->hasMany('App\TicketPlace');
    }
}
