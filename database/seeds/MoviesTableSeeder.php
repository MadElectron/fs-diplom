<?php

use Illuminate\Database\Seeder;

class MoviesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('movies')->insert([
          'title' => 'Гражданин Кейн',
          'description' => 'В шикарном поместье умирает газетный магнат Чарльз Фостер Кейн, роняя лишь одно слово: «Роузбад». Смерть Кейна вызывает бурную реакцию в обществе...',
          'country' => 'США',
          'duration' => 119,
      ]);

    }
}
