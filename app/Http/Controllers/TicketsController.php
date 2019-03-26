<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ticket;
use App\TicketPlace;

class TicketsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $ticket = Ticket::create([
            'showtime_id' => $data['showtime'],
            'qr_code' => '',
            'date' => new \DateTime($data['date']),
            'price' => $data['price']
        ]);

        foreach ($data['places'] as $place) {
            TicketPlace::create([
                'place_id' => $place,
                'ticket_id' => $ticket->id
            ]);
        }

        // Set QR code
        $url = $request->getHost();
        $tid = $ticket->id;
        $places = implode(',', $data['places']);
        $timestamp = (new \DateTime())->getTimestamp();

        $ticket->qr_code = "{$url}:/{$tid}?{$places}&{$timestamp}";
        $ticket->save();

        return response($ticket->qr_code)
            ->header('Content-Type', 'text/plain');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id = null)
    {
        if ($id) {
            $result = Ticket::where('id','=', $id)->get()->first();
        } else {
            // $result =  Ticket::with('showtime', 'places')->get();
            $result =  Ticket::with('places')->get();
        }

        return response($result)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
