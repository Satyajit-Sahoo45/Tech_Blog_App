<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\{Blog, rating_review, NewsLetter, Tag, BlogTag};

class BlogController extends Controller
{           
    public function index(){
        $blogs = Blog::with(['tags'])->get();
       dd($blogs->toArray());
    }

    public function getBlogsTags($id){
        $blogs = Blog::with(['tags'])->find($id);
        $tags = $blogs->tags;
        return response()->json($tags);
    }
    
    public function addTag(){
        $tags = request(['tag']);

        $addedTag = Tag::create($tags);

        return response()->json($addedTag);
    }

    public function updateReview($cmtId){
        $ratings = rating_review::find($cmtId);

        if(!$ratings){
            return response()->json(["ERROR" => $ratings]);
        }

        $updateCredentials = request(['id', 'rating', 'comment']);
        $ratings->update($updateCredentials);

        return response()->json($updateCredentials);
    }

    public function getNewsLetterServiceUser($id){
        $isNewsLetterUser = NewsLetter::where('user_id', $id)->get();

        if($isNewsLetterUser->isNotEmpty()){
            return ($isNewsLetterUser->toArray());
        }
        else{
            return response()->json("empty");
        }

    }

    public function addToNewsLetterService(){
    
        $credentials = request(['user_id', 'user_email']);
    
        NewsLetter::create($credentials);
    
        return response()->json("success");
    }

    public function getBlogsOfUser($id){
        $userBlog = Blog::where('user_id', $id)->get();

        return ($userBlog->toArray());
    }

    public function getBlogById($id){
        $blog = Blog::find($id);

        return response()->json(["blog" => $blog]);
    }

    public function getPublicBlogs($publish_status){
        $public_blogs = Blog::where('publish_status', $publish_status)->get();

        return ($public_blogs->toArray());
    }

    public function getMembersOnlyBlogs($publish_status){
        $public_blogs = Blog::where('publish_status', $publish_status)->get();

        return ($public_blogs->toArray());
    }

    public function updateBlog($id){
        $blog = Blog::find($id);
    
        $credentials = request(['title', 'author', 'summary', 'content', 'publish_status']);
    
        $blog->update($credentials);
    
        return response()->json("success");
    }

    public function deleteBlog($id){
        Blog::where('id', $id)->firstorfail()->delete();
    
        return response()->json("success");
    }

    public function addReview(){
        $credentials = request(['blog_id', 'user_id', 'userName', 'userEmail', 'rating', 'comment']);

        rating_review::create($credentials);

        return response()->json("review added successfully");
    }

    public function getReviewById($id) {
        $review = rating_review::where('blog_id', $id)->get();
        return ($review->toArray());
    }

    public function getReview(){
        $review = rating_review::with(['blog'])->get();
        return ($review->toArray());
    }

    public function getBlog(){
        $blog = Blog::with(['user'])->get();
        return ($blog->toArray());
    }


    public function getBlogStatus($id){
        $blog_status = Blog::find($id);

        return ($blog_status->toArray());
    }

    public function updateBlogStatus($id){
        $credential = request(['blog_status']);
        $blog = Blog::find($id);

        $blog->update($credential);

        return response()->json($credential);
    }

    public function addBlog(){
        $credentials = request(['title', 'author', 'summary', 'content', 'tags', 'user_id', 'publish_status', 'blog_status']);

        $tags = $credentials['tags'];

        $createdBlog = Blog::create($credentials);
        $tagIds = [];

        foreach($tags as $tagName){
            $tag = Tag::firstOrCreate(['tag'=>$tagName]);
            $tagIds[] = $tag->id;
        }

        foreach($tagIds as $tagId){
            $createdBlogTag = BlogTag::firstOrCreate(['blog_id'=>$createdBlog->id, 'tag_id'=>$tagId]);
        }


     
        // $allUser = NewsLetter::all();

        // foreach($allUser as $user){
        //     Mail::send('emails.blogCreated', $createdBlog->toArray(), function($message) use ($user){
        //         $message->to($user->user_email)
        //         ->subject('New Blog Added, check out!');
        //     });
            // echo $createdBlog->id;
        // }

        return response()->json($createdBlogTag);
    }
}
