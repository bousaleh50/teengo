import {useState } from "react";
import {useNavigate, NavLink } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";



function Login(){
    const navigate=useNavigate();
    const { setUser, setToken } = useStateContext();
    const [loginUser,setLoginUser]=useState({
        email:"",
        password:""
    })
    const [error,setError]=useState("")

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLoginUser({...loginUser,[name]:value});
        setError("")
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const options={
            method:"POST",
            Headers:{"Content-Type":"application/json"}
        }
         axios.post("http://localhost:4000/login",loginUser,options)
        .then((res)=>{
            const {user,token}=res.data;
            if(user){
                //setUser(user);
                //setToken(token);
                localStorage.setItem("ACCESS_TOKEN",token);
                localStorage.setItem("user",JSON.stringify(user));
                navigate("/");
            }
        }).catch(e=>setError(e.response.data.message));
    }

    return(
        <div className="flex flex-col w-full h-full px-5 gap-10 sm:flex-row sm:h-screen md:pr-40 2xl:max-w-5xl">
            <div className="flex flex-col justify-center mt-5 px-5 items-center flex-1">
                <div className="text-center">
                    <h1 className="text-blue-600 text-3xl md:text-5xl">TeenGo</h1>
                    <p className="mt-5">TeenGo where the friends connect and share</p>
                </div>
            </div>
            <div className="flex flex-col flex-1 px-5 w-full gap-5 border rounded-md  self-center shadow-lg bg-white">
                <div className="text-center">
                    <h1 className="text-3xl">Login</h1>
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <input className="border p-2 rounded-md"  type="email" placeholder="Email" name="email" onChange={handleChange}/>
                    <input className="border p-2 rounded-md" type="password" placeholder="password" name="password" onChange={handleChange}/>
                    <div>
                        {error&& <p className="text-red-500">{error}</p>}
                    </div>
                    <button className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500">login</button>
                </form>
                <div className="text-center">
                    <a href="#" className="text-blue-500 ">Forgot your password?</a>
                </div>
                <div className="flex justify-center gap-1 text-center mb-5">
                    <p>New to Teengo</p>
                    <NavLink to="/signup">
                      <span className="text-blue-500">Sing up</span>?
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default Login;