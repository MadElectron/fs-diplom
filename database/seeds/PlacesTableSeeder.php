<?php

use Illuminate\Database\Seeder;
use App\Hall;

class PlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $hall = Hall::find(1);

        for ($i = 0; $i < $hall->rows; $i++)
          for ($j = 0; $j < $hall->places_in_row; $j++){
            DB::table('places')->insert([
                'hall_id' => $hall->id,
                'type' => 1,
                'row_number' => $i,
                'number' => $j,
            ]);
          }

    }
}
