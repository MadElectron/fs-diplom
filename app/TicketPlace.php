<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketPlace extends Model
{
    protected $fillable = ['ticket_id', 'place_id'];

    public $timestamps = false;

    public function ticket() 
    {
      return $this->belongsTo('App\Ticket');
    }        

    public function places()
    {
      return $this->hasOne('App\Place');
    }
}
