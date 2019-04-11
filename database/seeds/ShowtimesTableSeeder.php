<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Hall;
use App\Movie;


class ShowtimesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $hall = Hall::find(1);    
      $movie = Movie::find(1);    

      $time = Carbon::now();
      $time->setTime(12, 0);

      DB::table('showtimes')->insert([
        'hall_id' => $hall->id,
        'movie_id' => $movie->id,
        'start_time' => $time,
      ]);
    }
}
