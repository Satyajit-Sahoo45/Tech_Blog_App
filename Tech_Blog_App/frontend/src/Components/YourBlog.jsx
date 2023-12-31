import React, { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import BlogItem from "./BlogItem";

function YourBlog() {
  const { http, user } = AuthUser();

  const [usersBlog, setUsersBlog] = useState([]);

  useEffect(() => {
    http
      .get(`/getBlogsOfUser/${user.id}`)
      .then((res) => {
        setUsersBlog(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(user.id);
  }, []);

  // console.log(usersBlog);

  return (
    <div className="top-20 w-screen absolute -z-10 bg-sky-300 p-4">
      <div>
        {usersBlog.map((val, index) => (
          <BlogItem key={index} blog={val} userId={val.user_id} />
        ))}
      </div>
    </div>
  );
}

export default YourBlog;
