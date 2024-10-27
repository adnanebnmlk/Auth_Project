<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;



Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users',UserController::class);
});


//Auth
Route::post('login',[AuthController::class,'Login'])->name('login');
Route::post('register', [AuthController::class,'Register']);

