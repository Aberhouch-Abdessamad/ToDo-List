<?php

namespace App\Http\Controllers;

use App\Models\Task;
use DateTime;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $title = $request->title;
    $description = $request->description;
    $execution_date_estimation = new DateTime($request->execution_date_estimation);
    $completed = (boolean) $request->completed;
    $priority = $request->priority;
    $tags = $request->tags; 
    
    Task::create([
        'title' => $title,
        'description' => $description,
        'execution_date_estimation' => $execution_date_estimation,
        'completed' => $completed,
        'priority' => $priority,
        'tags' => $tags
    ]);
    return response()->json(['message' => 'Task created successfully']);
}
    /**
     * Display the specified resource.
     */
    public function show(Task $task ,$id)
    {
        $task = Task::find($id);
        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        // dd($request->all());
        $title = $request->title;
        $description = $request->description;
        $execution_date_estimation = new DateTime($request->execution_date_estimation);
        $completed = (boolean) $request->completed;
        $priority = $request->priority;
        $tags = $request->tags; 
        
        $task->update([
            'title' => $title,
            'description' => $description,
            'execution_date_estimation' => $execution_date_estimation,
            'completed' => $completed,
            'priority' => $priority,
            'tags' => $tags
        ]);
        return response()->json(['message' => 'Task updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
