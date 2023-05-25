import { useEffect, useState } from "react";
import Post from "../post/Post";
import { Facebook, Instagram } from 'react-content-loader';
import axios from "axios";

function Posts() {
      const [posts,setPosts]=useState([]);
      const user=JSON.parse(localStorage.getItem("user"));
      
      useEffect(() => {
        axios.get("http://localhost:4000/posts")
        .then(res=>setPosts(res.data))
        .catch(e=>console.log(e))
      }, []);
      
    return (
      <div className="w-screen flex flex-col gap-5">
         {
          //isLoading?<Facebook className="p-5  m-auto z-10 w-4/6 xl:w-1/2 rounded-md sm:rounded-0 shadow-md"/>:
        posts.map((post,ind)=>
          <Post post={post} key={ind} user={user}/>)
       }
       
      </div>
    );
}

export default Posts;