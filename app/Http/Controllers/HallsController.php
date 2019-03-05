<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hall;
use App\Place;
use App\Showtime;

class HallsController extends Controller
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
        $hall = Hall::create([
            'title' => $request->title,
            'rows' => 0,
            'places_in_row' => 0,
        ]);

        return response('Hall added');
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
            $result = Hall::with('prices', 'places')->where('id','=', $id)->get()->first();
        } else {
            $result = Hall::with('prices', 'places')->get();
        }

        return response($result->toJson())
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
        Showtime::where('hall_id', '=', $id)->delete();
        Place::where('hall_id', '=', $id)->delete();
        Hall::where('id','=', $id)->delete();

        return response('Hall deleted');
    }
}
