<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Showtime;

class ShowtimesController extends Controller
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

        foreach($data as $hallId => $showtimes) {
            foreach($showtimes as $st) {
                Showtime::create([
                    'hall_id' => $hallId,
                    'movie_id' => $st['id'],
                    'start_time' => new \DateTime($st['startTime']),
                ]);    
            }
        }

        return response('Showtime added');
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
            $result = Showtime::with('hall.prices', 'hall.places', 'movie')->where('id','=', $id)->get()->first();
        } else {
            $result = Showtime::with('hall', 'movie')->orderBy('start_time')->get();
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
    public function destroy($id = null)
    {
        if ($id) {
            Showtime::where('id','=', $id)->delete();
        } else {
            Showtime::all()->delete();
        }

        return response('Showtime deleted');    
    }
}
