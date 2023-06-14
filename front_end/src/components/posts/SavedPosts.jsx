import React, { useEffect, useState } from 'react'
import Posts from './Posts'
import axios from 'axios';
import Post from '../post/Post';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function SavedPosts() {
    const [savedPosts,setSavedPosts]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        axios.get(`http://localhost:4000/posts/savedposts/${user._id}`).then((res)=>{
            setSavedPosts(res.data.posts);
        })
    },[]);

    
  return (
    <div className="w-screen flex flex-col gap-5">
       {
        savedPosts.length<1?
        <Stack sx={{margin:"20% auto auto auto"}}>
          <Alert variant="outlined" severity="info">
            You have no daved posts yet!
          </Alert>
        </Stack>
         :
        savedPosts.map((post,ind)=>
            <Post post={post} key={ind} user={user}/>
        )
       }
    </div>
  )
}

export default SavedPosts
