import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";


function Comments({displayComments,post,comment,deleteComment}) {
    const user=JSON.parse(localStorage.getItem("user"));
    
    return (
        <>
            {displayComments&&
            <div className="p-3 border rounded gap-3">
                <div className="flex gap-3 items-center">
                    <img src={post.img} alt="" className="w-5 h-5 rounded-full object-cover"/>
                    <Link to={`/profile/${comment.user_id}`}><span>{comment.username}</span></Link>
                    <span className="text-gray-400">1 minuts ago</span>
                    <div className="flex gap-4 ml-auto">
                        {
                            comment.user_id==user._id?<DeleteOutlineOutlinedIcon 
                            className="hover:text-blue-500"
                             onClick={()=>deleteComment(comment._id)}
                            />
                            :null
                        }
                    </div>
                </div>
                <div className="flex gap-4 p-4">
                    <span>{comment.content}</span>
                </div>
             </div>
            }
        </>
    );
}

export default Comments;     