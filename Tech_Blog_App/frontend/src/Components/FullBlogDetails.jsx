import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthUser from "./AuthUser";
import { AiFillStar } from "react-icons/ai";

function FullBlogDetails() {
  const { id } = useParams();
  const { http, user } = AuthUser();

  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [cmtId, setCmtId] = useState();
  const [reviewToggle, setReviewToggle] = useState(false);
  const [allReviews, setAllReview] = useState([]);
  const [reviewStatus, setReviewStatus] = useState("POST");
  const [blogStatus, setBlogStatus] = useState(1);
  const [blogTags, setBlogTags] = useState([]);
  const [singleBlogData, setSingleBlogData] = useState({
    author: "",
    content: "",
    created_at: "",
    id: "",
    publish_status: "",
    summary: "",
    tags: "",
    title: "",
    updated_at: "",
    user_id: "",
  });

  const setBlogStats = (e) => {
    // e.preventDefault();
    if (e.target.value == "public") {
      setBlogStatus(0);
    } else if (e.target.value == "private") {
      setBlogStatus(1);
    }
    console.log(blogStatus);
    http
      .put(`updateBlogStatus/${id}`, { blog_status: blogStatus })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    http
      .get(`/getBlogStatus/${id}`)
      .then((res) => {
        setBlogStatus(res.data.blog_status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    http
      .get(`/getBlogsTags/${id}`)
      .then((res) => {
        setBlogTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(blogTags);

  const submitReview = async (e) => {
    e.preventDefault();
    await http
      .post("/addReview", {
        blog_id: id,
        user_id: user.id,
        userName: user.name,
        userEmail: user.email,
        rating: parseInt(rating),
        comment: review,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(typeof(user.email));
    // console.log("sumit function called");
  };

  const getReviews = async (ele) => {
    http
      .get(`/getReviewById/${ele}`)
      .then((res) => {
        setAllReview(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editReview = (id, review, rating) => {
    // console.log(id, review, rating);
    setCmtId(id);
    setReview(review);
    setRating(rating);
    setReviewStatus("UPDATE");
    setReviewToggle(false);
  };

  useEffect(() => {
    http
      .get(`/getBlog/${id}`)
      .then((res) => {
        setSingleBlogData(res.data.blog);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateReview = (e) => {
    e.preventDefault();
    http
      .put(`/update/comment/${cmtId}`, {
        id: cmtId,
        rating: rating,
        comment: review,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
    // console.log(cmtId, review, rating);
  };

  // console.log(singleBlogData.title);

  return (
    <div className="top-20 w-screen absolute -z-10 bg-sky-300 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden mt-3">
        <div>
          <div>
            <img
              className="h-80 w-full object-cover"
              src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              <h1
                className={`relative -top-6 ${
                  singleBlogData.publish_status == "member"
                    ? "bg-red-900"
                    : "bg-slate-600"
                } text-white w-fit`}
              >
                {singleBlogData.publish_status}
              </h1>
              <div className="w-full bg-gray-200 h-8 flex mb-5">
                {blogTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-gray-200 rounded-lg py-1 px-2"
                  >
                    <span className="mr-2 lowercase">#{tag.tag}</span>
                  </span>
                ))}
              </div>
              
              <div className="mb-5">
                <label
                  for="publish_status"
                  className="block mb-2 font-bold text-gray-600"
                >
                  By default you blog is private, make it public to visisble to
                  all user
                </label>
                <select
                  id="blog_status"
                  name="blog_status"
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={setBlogStats}
                  // value={blogStatus}
                >
                  {blogStatus === 1 ? (
                    <>
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                    </>
                  ) : (
                    <>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </>
                  )}
                </select>
              </div>
              <h1 className="text-3xl p-2">
                <span className="text-red-600">Title: </span>{" "}
                {singleBlogData.title}
              </h1>
              <p className="text-sm p-2">
                <span className="text-red-600">Summary: </span>{" "}
                {singleBlogData.summary}{" "}
              </p>
              <p className="text-sm p-2">
                <span className="text-red-600">Content: </span>
                {singleBlogData.content}{" "}
              </p>
              <h1 className="p-2">
                <span className="text-gray-500">Author: </span>{" "}
                {singleBlogData.author}{" "}
              </h1>
              <p className="p-2">
                <span className="text-red-600">Tags: </span>
                {singleBlogData.tags}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid place-items-center">
        <a
          className="bg-sky-400 p-4 mt-3 rounded-lg text-white hover:cursor-pointer"
          onClick={(e) => {
            setReviewToggle(!reviewToggle);
            getReviews(id);
          }}
        >
          {" "}
          {reviewToggle === true ? "Post Reviews" : "Show Review"}
        </a>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden mt-3">
        {reviewToggle ? (
          <div className="row d-flex justify-content-center w-100">
            <div className="card-body p-4">
              {allReviews ? (
                allReviews.map((val, ind) => (
                  <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                    <div className="relative flex gap-4">
                      <img
                        src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                        className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                        alt=""
                        loading="lazy"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between">
                          <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                            {val.userName}
                          </p>
                          <div>
                            <a
                              className="text-gray-500 text-xl p-2"
                              onClick={() =>
                                editReview(val.id, val.comment, val.rating)
                              }
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </a>
                            <p className="flex p-2">
                              {[...Array(val.rating)].map((_, index) => {
                                return (
                                  <AiFillStar
                                    key={index}
                                    style={{ color: "orange" }}
                                  />
                                );
                              })}
                              {[...Array(5 - val.rating)].map((_, index) => {
                                return <AiFillStar key={index} />;
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="-mt-4 text-gray-500">{val.comment}</p>
                  </div>
                ))
              ) : (
                <h1> Failed to fetch reviews </h1>
              )}
            </div>
          </div>
        ) : (
          // <h1>comment section</h1>
          <div class="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form
              onSubmit={reviewStatus === "POST" ? submitReview : updateReview}
            >
              <div class="mb-5">
                <label
                  for="publish_status"
                  class="block mb-2 font-bold text-gray-600"
                >
                  SELECT RATING
                </label>
                <select
                  id="rating"
                  name="rating"
                  class="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                >
                  <option defaultValue={0}>Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div class="mb-5">
                <label for="title" class="block mb-2 font-bold text-gray-600">
                  Write Your Review
                </label>
                <textarea
                  type="text"
                  id="review"
                  name="review"
                  placeholder="Enter Review"
                  class="border border-gray-300 shadow p-3 w-full rounded mb-"
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                />
              </div>

              <button
                type="submit"
                class="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default FullBlogDetails;
