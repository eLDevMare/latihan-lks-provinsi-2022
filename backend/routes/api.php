<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourtController;

Route::middleware('auth:api')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/court/{sport_id}/{date}', [CourtController::class, 'getCourt']);
    Route::post('/court/post', [CourtController::class, 'registerCourt']);
});



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/invalid',[AuthController::class, 'invalidToken'])->name('login');