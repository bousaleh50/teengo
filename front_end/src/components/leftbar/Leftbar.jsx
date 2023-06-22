import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/pexels-mohamed-abdelghaffar-771742.jpg'

function LeftBar() {
    const [current_user,setUser]=useState({});
    const user=JSON.parse(localStorage.getItem("user"));
    //the current user followers table does not work at current time

    useEffect(()=>{
        axios.get(`http://localhost:4000/users/${user._id}`)
        .then((res)=>setUser(res.data.user))
        .catch((e)=>console.log(e))
    },[])

    return (
        <div className="hidden z-50 xl:flex xl:flex-col xl:items-center xl:fixed xl:left-0 xl:top-15 xl:p-5  xl:w-1/4 xl:h-screen xl:bg-gray-100 xl:flex-1">
            <div className='bg-white w-full flex mt-6 rounded-md flex-col items-center p-5 gap-5 shadow-md'>
                <div className='flex flex-col items-center gap-4'>
                    <img src={img} alt="current user pic" className="w-20 h-20 rounded-full object-cover"/>
                    <Link to={`/profile/${user._id}`}>{user.first_name+" "+user.last_name}</Link>
                </div>
                <div className='flex gap-6'>
                    <div className='flex flex-col-reverse items-center'>
                        <span className='text-gray-300'>Followers</span>
                        <span>{user.followers.length}</span>
                    </div>
                    <div className='flex flex-col-reverse items-center'>
                        <span className='text-gray-300'>Following</span>
                        <span>{user.following.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;