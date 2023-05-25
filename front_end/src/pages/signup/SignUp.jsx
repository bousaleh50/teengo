import { useState } from "react";
import {NavLink, useNavigate } from "react-router-dom";
import axios from "axios";



function SignUp(){
    const navigate=useNavigate();
    //creating new user
    const [newUser,setNewUser]=useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setNewUser({...newUser,[name]:value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        //define the optios for the axios request
        const options={
            method:"POST",
            Headers:{"Content-Type":"application/json"}
        }
         axios.post("http://localhost:4000/register",newUser,options)
        .then((res)=>{
            const {token,user}=res.data;
            localStorage.setItem("ACCESS_TOKEN",token)
            localStorage.setItem("user",JSON.stringify(user));
            navigate("/")
        })
        .catch((e)=>console.log(e));
    }

    return(
        <div className="flex flex-col w-full h-full px-5 gap-10 sm:flex-row sm:h-screen md:pr-40 2xl:max-w-5xl bg-white">
            <div className="flex flex-col justify-center mt-5 px-5 items-center flex-1">
                <div className="text-center">
                    <h1 className="text-blue-600 text-3xl md:text-5xl">TeenGo</h1>
                    <p className="mt-5">TeenGo where the friends connect and share</p>
                </div>
            </div>
            <div className="flex flex-col flex-1 px-5 w-full min-h-fit gap-5 border rounded-md  self-center shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl">Sign Up</h1>
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="font-bold">First Name</label>
                        <input id="firstName" className="border p-2 rounded-md" type="text" name="first_name" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="font-bold">Last Name</label>
                        <input id="lastName" className="border p-2 rounded-md" type="text" name="last_name" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-bold">Email</label>
                        <input id="email" className="border p-2 rounded-md" type="email" name="email" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-bold">Password</label>
                        <input id="password" className="border p-2 rounded-md" type="password" name="password" onChange={handleChange}/>
                    </div>
                    {
                        /*<div className="flex flex-col">
                        <label htmlFor="birthday" className="font-bold">Birth Day</label>
                        <input id="birthday" className="border p-2 rounded-md" type="date" name="birth_day" onChange={handleChange}/>
                        </div>
                        <div className="">
                            <p className="font-bold">Gender</p>
                            <div className="flex gap-4">
                                <div className="flex gap-3">
                                    <label htmlFor="male">Male</label>
                                    <input id="male" className="border p-2 rounded-md" name="gender" type="radio" onChange={handleChange}/>
                                </div>
                                <div className="flex gap-3">
                                    <label htmlFor="female">Female</label>
                                    <input id="female" className="border p-2 rounded-md" name="gender" type="radio" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>*/
                    }
                    <button className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500">Sign Up</button>
                </form>
                <div className="flex justify-center gap-1  mb-5">
                    <p href="#">Already have an account </p>
                    <NavLink to="/login">   
                      <span className="text-blue-500">login in </span>?
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default SignUp;