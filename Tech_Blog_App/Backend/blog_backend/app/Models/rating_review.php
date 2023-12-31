<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rating_review extends Model
{
    use HasFactory;

    protected $fillable = ['blog_id', 'user_id', 'userName', 'userEmail', 'rating', 'comment'];

    public function blog(){
        return $this->belongsTo(Blog::class);
    }
} 
