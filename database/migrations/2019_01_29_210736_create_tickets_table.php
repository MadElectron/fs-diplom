<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('showtime_id')->unsigned();
            $table->string('qr_code');
            $table->integer('price');
            $table->datetime('date');
            $table->foreign('showtime_id')->references('id')->on('showtimes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['showtime_id']);
        });

        Schema::dropIfExists('tickets');
    }
}
