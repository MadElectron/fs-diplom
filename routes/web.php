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

Route::post('/movies/add', 'MoviesController@store')->name('movies_add');
Route::post('/movies/list', 'MoviesController@show')->name('movies_list');
Route::post('/movies/delete/{id}', 'MoviesController@destroy')->name('movies_delete');