import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function Comments({displayComments,post,comment}) {
    return (
        <>
            {displayComments&&
            <div className="p-3 border rounded gap-3">
                <div className="flex gap-3 items-center">
                    <img src={post.img} alt="" className="w-5 h-5 rounded-full object-cover"/>
                    <span>{comment.username}</span>
                    <span className="text-gray-400">1 minuts ago</span>
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