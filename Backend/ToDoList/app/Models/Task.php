<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'execution_date_estimation', 
        'completed',
        'priority',
        'tags',
    ];

    protected $casts = [
        'execution_date_estimation' => 'datetime', 
        'completed' => 'boolean',
        'priority' => 'integer',
        'tags' => 'array',
    ];
}
