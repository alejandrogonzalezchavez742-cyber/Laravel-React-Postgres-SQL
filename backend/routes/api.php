<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductoController;

// 1. Rutas PÚBLICAS
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/productos', [ProductoController::class, 'index']);

// 2. Rutas PROTEGIDAS para cualquier usuario con sesión iniciada
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// 3. Rutas EXCLUSIVAS de ADMINISTRADOR (Usa solo 'admin', nunca 'role')
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Usuarios y Estadísticas
    Route::get('/usuarios', [UserController::class, 'index']);
    Route::put('/usuarios/{id}/role', [UserController::class, 'updateRole']);
    Route::delete('/usuarios/{id}', [UserController::class, 'destroy']);
    Route::get('/stats', [UserController::class, 'stats']);

    // Productos
    Route::get('/productos', [ProductoController::class, 'index']);
    Route::post('/productos', [ProductoController::class, 'store']);
    Route::put('/productos/{id}', [ProductoController::class, 'update']);
    Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);
});
