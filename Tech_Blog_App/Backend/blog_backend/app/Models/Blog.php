<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $guards = [];

    protected $fillable = ['title', 'author', 'summary', 'content', "user_id", "publish_status", "blog_status"];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function ratingReviews(){
        return $this->hasMany(rating_review::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class);
    }
}
