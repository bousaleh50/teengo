import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useState , useEffect} from "react";
import Comments from "../comments/Comments";
import axios from "axios";



function Post({post,user}){
    const [liked,setLiked]=useState(false);
    const [saved,setSaved]=useState(false)
    const [comments,setComments]=useState([]);
    const [limit,setLimit]=useState(3)
    const [nbLikes,setNbLikes]=useState(post.nb_likes);
    const [nbComments,setNbComments]=useState(post.nb_comments);
    const [newComment,setNewComment]=useState({
        post_id:post._id,
        user_id:user._id,
        content:"",
        username:`${user.first_name} ${user.last_name}`
    });
    //const user=JSON.parse(localStorage.getItem("user"));
    const options={
        method:"POST",
        Headers:{
            "Content-Type":"application/json"
        }
    }

    //this should send a request to database to show a number of comments
    const [showComments,setShowComments]=useState(false);

    useEffect(()=>{
        async function getPostInfo(){
            await axios.get(`http://localhost:4000/posts/hasLiked/${post._id}/${user._id}`,{
            method:"GET",
            Headers:{"Contetn-Type":"application/json"}
            }).then((res)=>{
                setLiked(res.data.liked);
                setSaved(res.data.saved);
            }).catch(e=>console.log(e));
        }
        getPostInfo();
    },[]);

    const showCommentsHelper=async ()=>{
       await axios.get(`http://localhost:4000/comments/show_comments/${post._id}/${limit}`,{
            method:"GET",
            Headers:{"Content-Type":"application/json"}
            })
            .then((res)=>{
                setComments(res.data)
                console.log(res.data)
            }).catch(e=>console.log(e))
    }

    const handleshowComments=()=>{
        if(!showComments){
            showCommentsHelper();
        }
        setShowComments(!showComments);
    }

    const showMore=()=>{
         setLimit((currentLimit)=>{
            return currentLimit+1
         })
         showCommentsHelper()
    }

    const handleLike=async (post_id)=>{
        if(!liked){
            await axios.get(`http://localhost:4000/like/${post_id}/${user._id}`,options)
            .then((res)=>{
                setNbLikes(nbLikes+1);
            }).catch(e=>console.log(e));
        }else{
            await axios.delete(`http://localhost:4000/unlike/${post_id}/${user._id}`,{
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }            
            ).then((res)=>{
                setNbLikes(nbLikes-1);
            })
            .catch((e)=>console.log(e))
        }
        setLiked(!liked)
    }


    const handleSavePost=async ()=>{
        const user=JSON.parse(localStorage.getItem("user"));
        if(!saved){
            await axios.get(`http://localhost:4000/posts/save/${post._id}/${user._id}`,options)
            .catch(e=>console.log(e));
        }else{
            await axios.delete(`http://localhost:4000/posts/unsave/${post._id}/${user._id}`,{
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }            
            )
            .catch((e)=>console.log(e))
        }
        setSaved(!saved)
    }

    const handleDeleteComment=async (comment_id)=>{
        axios.delete(`http://localhost:4000/comments/delete/${comment_id}`)
       
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(newComment==""){
            alert("please type somehtong")
        }else{
            setNbComments(nbComments+1);
            setLimit(limit+1);
            setComments([...comments,newComment])
            axios.post("http://localhost:4000/comments/create_comment",newComment,options)
            .catch(e=>console.log(e));
            setShowComments(true)
            setNewComment({...newComment,content:""});
        }
    }
    
    return(
        <div className='bg-white p-5  m-auto z-10 w-4/6 xl:w-1/2 rounded-md sm:rounded-0 shadow-md '>
            <div className='flex justify-between items-center px-4'>
                <div className='flex gap-3 items-center py-5'>
                    <img src="{/*post.profilePic*/null}" alt="user img" className="w-5 h-5 rounded-full object-cover"/>
                    <div className="flex flex-col items-center">
                        <span className='text-sm'>{post.name}</span>
                        <span className="text-sm text-gray-300">{post.date_post}</span>
                    </div>
                </div>
                <MoreHorizOutlinedIcon className="hover:text-blue-600 cursor-pointer"/>
            </div>
            <div className='m-5 flex flex-col gap-4'>
                <p>{post.content}</p>
                {post.img&&<img src="{/*post.img*/null}" className="max-h-72 w-full object-cover"/>}
            </div>
            <div>
                <hr className="text-7xl" />
            </div>
            <div className="flex gap-10 p-5  justify-evenly">
                <div className="flex flex-col gap-3 items-center sm:flex-row">
                  {liked?<FavoriteOutlinedIcon className="text-red-500 cursor-pointer" onClick={()=>handleLike(post._id)}/>:<FavoriteBorderOutlinedIcon className="hover:text-blue-600 cursor-pointer" onClick={()=>handleLike(post._id)}/>}
                  {nbLikes}
                </div>
                <div className="flex flex-col gap-3 items-center sm:flex-row">
                  <TextsmsOutlinedIcon className="hover:text-blue-600 cursor-pointer" onClick={()=>handleshowComments()}/>
                  {nbComments}
                </div>
                <div className="flex flex-col gap-3 items-center sm:flex-row">
                  {saved?<BookmarkOutlinedIcon className="hover:text-blue-600 cursor-pointer" onClick={handleSavePost}/>:<BookmarkBorderOutlinedIcon className="hover:text-blue-600 cursor-pointer" onClick={handleSavePost}/>}
                </div>
            </div>
            <div className="flex justify-between -z-50 p-3 items-center">
                <img src={post.img} alt="current user"  className="w-5 h-5 rounded-full object-cover" />
                <form className="flex gap-5 items-center w-11/12" onSubmit={handleSubmit}>
                    <input type="text" className="rounded-md border w-full flex-1 p-3 z-50 outline-none" 
                        placeholder="write a comment" value={newComment.content} onChange={(e)=>setNewComment({...newComment,content:e.target.value})}/>
                    <button className="bg-blue-500 text-white rounded-sm p-1 ml-auto" disabled={newComment.content==""?true:false} >Send</button>
                </form>
            </div>
            {
                comments.map((c,ind)=><Comments key={ind} post={post} displayComments={showComments} comment={c} deleteComment={handleDeleteComment}/>)
            }
            {
                showComments&&
                <div className="w-full flex justify-center py-5">
                 <button  className="text-blue-500 "
                 onClick={()=>showMore()}>Show more</button>
               </div>
            }
        </div>
    
    )
}

export default Post;