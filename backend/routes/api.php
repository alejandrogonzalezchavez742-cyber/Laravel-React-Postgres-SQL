<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\UserController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Estas son las dos rutas que te daban error 404:
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Rutas exclusivas de administrador:
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/usuarios', [UserController::class, 'index']);
    Route::put('/usuarios/{id}/role', [UserController::class, 'updateRole']);
    Route::delete('/usuarios/{id}', [UserController::class, 'destroy']);
    Route::get('/stats', [UserController::class, 'stats']);
});
