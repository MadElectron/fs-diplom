<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/admin', function () {
    return view('admin');
});


Route::post('/halls/add', 'HallsController@store')->name('halls_add');
Route::post('/halls/list', 'HallsController@show')->name('halls_list');
Route::post('/halls/delete/{id}', 'HallsController@destroy')->name('halls_delete');

Route::post('/places/add/{hallId}', 'PlacesController@store')->name('places_add');
Route::post('/places/list', 'PlacesController@show')->name('places_list');
Route::post('/places/delete/{id}', 'PlacesController@destroy')->name('places_delete');

Route::post('/place-type-prices/add/{hallId}', 'PlaceTypePricesController@store')->name('place_type_prices_add');
Route::post('/place-type-prices/edit/{hallId}', 'PlaceTypePricesController@update')->name('place_type_prices_edit');

Route::post('/movies/add', 'MoviesController@store')->name('movies_add');
Route::post('/movies/edit/{id}', 'MoviesController@update')->name('movies_edit');
Route::post('/movies/list', 'MoviesController@show')->name('movies_list');
Route::post('/movies/delete/{id}', 'MoviesController@destroy')->name('movies_delete');

Route::post('/showtimes/add', 'ShowtimesController@store')->name('showtimes_add');
Route::post('/showtimes/list', 'ShowtimesController@show')->name('showtimes_list');
Route::post('/showtimes/{id}', 'ShowtimesController@show')->name('showtime');
Route::post('/showtimes/delete/{id}', 'ShowtimesController@destroy')->name('showtimes_delete');

Route::post('/tickets/add', 'TicketsController@store')->name('tickets_add');
Route::post('/tickets/list', 'TicketsController@show')->name('tickets_list');
Route::post('/tickets/{id}', 'TicketsController@show')->name('ticket');

