import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";

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
        <div className='profile'>
        {/*your sidebar*/}
        <div className='profileRight'>
          <div className="profileRightTop">
              <div className="profileCover">
                  <img className='profileCoverImg' src="../assets/cover.jpg" alt="" />
                  <img className='profileUserImg' src="../assets/user.png" alt="" />
              </div>
              <div className="profileInfo">
                  <h4 className='profileInfoName'><span>{profileUser.first_name}</span></h4>
                  <span className='profileInfoDesc'>this place for my description!!</span>
              </div>
          </div>
          <div className="profileRightBottom">
              {/*Feed page*/}
              {/*your rightbar*/}
          </div>
        </div>
      </div>
    );
}
export default Profile;
