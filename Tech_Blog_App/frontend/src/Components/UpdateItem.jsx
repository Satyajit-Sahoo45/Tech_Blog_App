import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";

function UpdateItem() {
  const { id } = useParams();
  const { http, user } = AuthUser();
  const navigate = useNavigate();

  const [editBlog, setEditBlog] = useState({
    title: "",
    author: user.name,
    summary: "",
    content: "",
    // tags: "",
    user_id: user.id,
    publish_status: "",
  });

  const inputUpdateListner = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setEditBlog((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const updateForm =(e) =>{
    e.preventDefault();
    http
    .put(
      `/updateBlog/${id}`,
      {
        title: editBlog.title,
        author: editBlog.author,
        summary: editBlog.summary,
        content: editBlog.content,
        // tags: editBlog.tags,
        publish_status: editBlog.publish_status,
      },
      { headers: { "Content-Type": "applicaiton/json" } }
    )
    .then((res) => {
    //   console.log(res.data);
      navigate("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    http.get(`/getBlog/${id}`).then((res) => {
      setEditBlog(res.data.blog);
    });
  }, []);


  return (
    <div className="top-20 absolute w-screen -z-10">
      <div className="bg-blue-200 min-h-screen flex items-center">
        <div className="w-full">
          <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
            Edit Your Blog
          </h2>
          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form
            onSubmit={updateForm}
            >
              <div className="mb-5">
                <label for="title" className="block mb-2 font-bold text-gray-600">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter the title "
                  className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  onChange={inputUpdateListner}
                  value={editBlog.title}
                />
              </div>

              <div class="mb-5">
                <label for="author" className="block mb-2 font-bold text-gray-600">
                  AUTHOR
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Enter author name"
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={inputUpdateListner}
                  value={editBlog.author}
                />
              </div>
              <div className="mb-5">
                <label for="summary" className="block mb-2 font-bold text-gray-600">
                  SUMMARY OF BLOG
                </label>
                <textarea
                  type="text"
                  id="summary"
                  name="summary"
                  placeholder="write your summary here."
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={inputUpdateListner}
                  value={editBlog.summary}
                />
              </div>
              <div class="mb-5">
                <label for="content" className="block mb-2 font-bold text-gray-600">
                  CONTENT
                </label>
                <textarea
                  type="text"
                  id="content"
                  name="content"
                  placeholder="Write your content"
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={inputUpdateListner}
                  value={editBlog.content}
                />
              </div>
              <div className="mb-5">
                <label for="tag" className="block mb-2 font-bold text-gray-600">
                  Tag
                </label>
                <textarea
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="tags"
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  // onChange={inputUpdateListner}
                  // value={editBlog.tags}
                />
              </div>
              <div className="mb-5">
                <label
                  for="publish_status"
                  className="block mb-2 font-bold text-gray-600"
                >
                  SELECT YOUR PUBLISH STATUS
                </label>
                <select
                  id="publish_status"
                  name="publish_status"
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={inputUpdateListner}
                  value={editBlog.publish_status}
                >
                  <option selected>Choose publish status</option>
                  <option value="public">Public</option>
                  <option value="member">Member</option>
                </select>
              </div>

              <button
                type="submit"
                className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
              >
                Update Data
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateItem;
