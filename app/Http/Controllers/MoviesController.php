<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Movie;

class MoviesController extends Controller
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
        $movie = Movie::create([
            'title' => $request->title,
            'description' => $request->description,
            'country' => $request->country,
            'duration' => $request->duration,
        ]);

        $this->validate($request, [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = $movie->id;
            $destinationPath = public_path('/i/posters');
            imagejpeg(imagecreatefromstring(file_get_contents("$image")), "$destinationPath/$name.jpg");
        }

        return response('Movie added');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $result = Movie::with(['showtimes' => function($st){
            $st->orderBy('hall_id', 'ASC')->orderBy('start_time', 'ASC');
        }, 'showtimes.hall'])->get();

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
        Movie::where('id','=', $id)->delete();
    
        $destinationPath = public_path('/i/posters');
        Storage::delete("$destinationPath/$id.jpg");
        // @TODO: Не удаляется файл

        return response('Movie deleted');
    }
}
