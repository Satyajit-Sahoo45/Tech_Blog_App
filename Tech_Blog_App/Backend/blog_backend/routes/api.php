<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


Route::group(['middleware'=>'api'],function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

// Route::group(['middleware'=>'api'], function(){

    Route::get('/getBlogsTags/{id}', [BlogController::class, 'getBlogsTags']);

    Route::get('index', [BlogController::class, 'index']);
    
    Route::post('/addBlog', [BlogController::class, 'addBlog']);
    Route::get('/getBlog', [BlogController::class, 'getBlog']);
    Route::get('/getBlog/{id}', [BlogController::class, 'getBlogById']);
    Route::get('/getBlogsOfUser/{id}', [BlogController::class, 'getBlogsOfUser']);
    Route::put('/updateBlogStatus/{id}', [BlogController::class, 'updateBlogStatus']);
    Route::get('/getBlogStatus/{id}', [BlogController::class, 'getBlogStatus']);
    
    Route::delete('/deleteBlog/{id}', [BlogController::class, 'deleteBlog']);
    Route::put('/updateBlog/{id}', [BlogController::class, 'updateBlog']);
    
    Route::get('/getPublicBlogs/{publish_status}', [BlogController::class, 'getPublicBlogs']);
    Route::get('/getMembersOnlyBlogs/{publish_status}', [BlogController::class, 'getMembersOnlyBlogs']);
    
    
    Route::post('/addReview', [BlogController::class, 'addReview']);
    Route::get('/getReview', [BlogController::class, 'getReview']);
    Route::get('/getReviewById/{id}', [BlogController::class, 'getReviewById']);
    Route::put('/update/comment/{id}', [BlogController::class, 'updateReview']);
    
    Route::post('/addToNewsLetterService', [BlogController::class, 'addToNewsLetterService']);
    Route::get('/getNewsLetterServiceUser/{id}', [BlogController::class, 'getNewsLetterServiceUser']);
// });/
