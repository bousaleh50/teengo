import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
    const {id}=useParams();
    const [profileUser,setProfileUser]=useState({});
    const options={
        method:"GET",
        headers:{"Content-Type":"application/json"},
        //Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    }
    useEffect(()=>{
        axios.get(`http://localhost:4000/users/${id}`,options)
        .then((res)=>{
            const {user}=res.data;
            if(user){
                setProfileUser(user);
            }
        })
        .catch(e=>console.log(e));
    },[])
    return (
        <div className="flex flex-col">
            <div className="">
                <div className="">
                    {//<img src={profile} alt="" />
                    }
                </div>
                <div>
                    <img src="" alt="" />
                </div>
            </div>
            <div>
                <span>{profileUser.first_name}</span>
            </div>
            <div>
                <div>
                    <span>5K</span>
                    <span>Followers</span>
                </div>
                <div>
                    <span>5k</span>
                    <span>Following</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;