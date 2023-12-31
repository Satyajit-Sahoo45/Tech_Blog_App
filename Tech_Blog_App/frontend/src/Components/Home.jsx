import React, { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { http, user } = AuthUser();
  const [show, setShow] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [blogData, setData] = useState({
    title: "",
    author: user.name,
    summary: "",
    content: "",
    tags: [],
    user_id: user.id,
    publish_status: "",
    blog_status: 1, // 1 -> private , 0 -> public
  });

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };


  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const inputListner = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    http
      .get(`/getNewsLetterServiceUser/${user.id}`)
      .then((res) => {
        if (res.data === "empty") {
          setShow(false);
        } else {
          setShow(true);
        }
      })
      .catch((res) => {
        console.log(error);
      });
    // console.log(user);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    http
      .post(
        "/addBlog",
        {
          title: blogData.title,
          author: blogData.author,
          summary: blogData.summary,
          content: blogData.content,
          tags: tags,
          user_id: blogData.user_id,
          publish_status: blogData.publish_status,
          blog_status: blogData.blog_status,
        },
        { headers: { "Content-Type": "applicaiton/json" } }
      )
      .then((res) => {
        // console.log(res.data);
        navigate("/blogs");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToNewsLetterService = (user_id, user_email) => {
    http
      .post("/addToNewsLetterService", {
        user_id: user_id,
        user_email: user_email,
      })
      .then((res) => {
        console.log(res.data);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="top-20 absolute w-screen -z-10">
      <div className="bg-blue-200 min-h-screen flex items-center flex-col p-9">
        {show === false ? (
          <div
            className="p-4 mt-2 min-w-4xl mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <div>
              <span className="font-medium">Info alert!</span> Join our{" "}
              <span className="text-red-600">NewsLetter</span> service to get
              update on when we a new blog gets added.
              <i className="fa-solid fa-xmark p-2 text-red-900"></i>
            </div>
            <button
              className="bg-green-700 p-2 px-4 rounded-lg text-white"
              onClick={() => addToNewsLetterService(user.id, user.email)}
            >
              Add
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="w-full">
          <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
            ADD YOUR BLOG
          </h2>
          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form>
              <div className="mb-5">
                <label
                  for="title"
                  className="block mb-2 font-bold text-gray-600"
                >
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter the title "
                  className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  onChange={inputListner}
                  value={blogData.title}
                />
              </div>

              <div className="mb-5">
                <label
                  for="author"
                  className="block mb-2 font-bold text-gray-600"
                >
                  AUTHOR
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Enter author name"
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={inputListner}
                  value={blogData.author}
                />
              </div>
              <div class="mb-5">
                <label
                  for="summary"
                  className="block mb-2 font-bold text-gray-600"
                >
                  SUMMARY OF BLOG
                </label>
                <textarea
                  type="text"
                  id="summary"
                  name="summary"
                  placeholder="write your summary here."
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={inputListner}
                  value={blogData.summary}
                />
              </div>
              <div className="mb-5">
                <label
                  for="content"
                  className="block mb-2 font-bold text-gray-600"
                >
                  CONTENT
                </label>
                <textarea
                  type="text"
                  id="content"
                  name="content"
                  placeholder="Write your content"
                  className="border border-red-300 shadow p-3 w-full rounded mb-"
                  onChange={inputListner}
                  value={blogData.content}
                />
              </div>
              <div className="mb-5">
                <label
                  for="tags"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-4 w-full">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-200 rounded-lg py-1 px-2"
                    >
                      <span className="mr-2">{tag}</span>
                      <button
                        className="text-gray-500 hover:text-red-500 focus:outline-none"
                        onClick={() => removeTag(index)}
                      >
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex w-full">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="border border-gray-200 rounded-md px-3 mr-2 focus:outline-none w-full"
                    placeholder="Enter a tag"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Add
                  </button>
                </div>
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
                  onChange={inputListner}
                  value={blogData.publish_status}
                >
                  <option selected>Choose publish status</option>
                  <option value="public">To All Public</option>
                  <option value="member">Members Only</option>
                </select>
              </div>

              <button
                type="submit"
                className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
                onClick={submitForm}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
