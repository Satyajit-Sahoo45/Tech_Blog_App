import React, { useEffect, useState } from "react";
import AuthUser from "../Components/AuthUser";
import { useNavigate } from "react-router-dom";
import BlogItem from "./BlogItem";

function Blog() {
  const navigate = useNavigate();
  const { token, http } = AuthUser();

  const [publicBlogData, setPublicBlogData] = useState([]);

  useEffect(() => {
    http
      .get("/getBlog")
      .then((res) => {
        setPublicBlogData(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(publicBlogData);

  return (
    <div className="top-20 w-screen absolute -z-10 bg-sky-300 p-4">
      <div>
        {publicBlogData.map((val, index) =>(
          val.blog_status === 0 ? (
            <BlogItem key={index} blog={val} userId={val.user.id} />
          ) : (
            ""
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;
