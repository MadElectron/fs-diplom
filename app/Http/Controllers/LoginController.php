<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Passport\ClientRepository as Cr;

class LoginController extends Controller
{
    /*
     * @param  int  $clientId
     * @return \Illuminate\Http\Response
     */
    public function getClientSecret($clientId)
    {
        $cr = new Cr();
        $client = $cr->find($clientId);

        return response($client->secret)
          ->header('Content-Type', 'text/plain');
        // return response($client->toJson())
        //     ->header('Content-Type', 'application/json');

    }
}
