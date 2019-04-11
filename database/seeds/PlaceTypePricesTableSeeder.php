<?php

use Illuminate\Database\Seeder;
use App\Hall;

class PlaceTypePricesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $hall = Hall::find(1);
      
      DB::table('place_type_prices')->insert([
          'hall_id' => $hall->id,
          'type' => 1,
          'price' => 300,
      ]);

      DB::table('place_type_prices')->insert([
          'hall_id' => $hall->id,
          'type' => 2,
          'price' => 450,
      ]);
    }
}
