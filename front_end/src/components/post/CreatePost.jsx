import { useState } from "react";

function CreatePost(){
    const [post,setPost]=useState({
        content:"",
        file:""
    });
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setPost({...post,[name]:value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(post);
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea name="content" id="" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <input type="file" name="file" onChange={handleChange}/>
                </div>
                <button>post</button>
            </form>
        </div>
    )
}
export default CreatePost;