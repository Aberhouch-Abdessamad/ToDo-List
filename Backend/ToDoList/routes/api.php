<?php
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Task routes
Route::get('/tasks', [TaskController::class, 'index']); 

Route::get('/tasks/{id}', [TaskController::class, 'show']);

Route::post('/tasks/store', [TaskController::class, 'store']);

Route::put('/tasks/update/{id}', [TaskController::class, 'update']);

Route::delete('/tasks/delete/{id}', [TaskController::class, 'destroy']);
