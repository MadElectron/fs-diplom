<?php

use Illuminate\Database\Seeder;

class HallsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('halls')->insert([
            'title' => 'Зал 1',
            'rows' => 6,
            'places_in_row' => 6,
        ]);
    }
}
