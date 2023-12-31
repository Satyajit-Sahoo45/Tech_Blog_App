<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogTag extends Model
{
    use HasFactory;

    protected $guards = [];
    protected $table = 'blog_tag';

    protected $fillable = ['blog_id', 'tag_id'];

    
}
