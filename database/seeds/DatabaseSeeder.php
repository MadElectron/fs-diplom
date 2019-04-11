<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        if (App::environment(['local', 'staging'])) {
            $this->call(AuthTableSeeder::class);
        }

        $this->call(UsersTableSeeder::class);
        $this->call(HallsTableSeeder::class);
        $this->call(PlacesTableSeeder::class);
        $this->call(PlaceTypePricesTableSeeder::class);
        $this->call(MoviesTableSeeder::class);
        $this->call(ShowtimesTableSeeder::class);
    }
}
