<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShowtimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('showtimes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('hall_id')->unsigned();
            $table->integer('movie_id')->unsigned();
            $table->datetime('start_time');
            $table->foreign('hall_id')->references('id')->on('halls');
            $table->foreign('movie_id')->references('id')->on('movies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('showtimes', function (Blueprint $table) {
            $table->dropForeign(['hall_id']);
            $table->dropForeign(['movie_id']);
        });

        Schema::dropIfExists('showtimes');
    }
}
