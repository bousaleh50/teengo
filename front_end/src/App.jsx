import { createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes } from "react-router-dom";
import LeftBar from "./components/leftbar/Leftbar";
import NavBar from "./components/navbar/Navbar";
import RightBar from "./components/rightbar/Rightbar";
import Home from "./pages/home/home";
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/profile/Profile";
import CreatePost from "./components/post/CreatePost";
import Settings from "./pages/settings/Settings";
import { useStateContext } from "./contexts/ContextProvider";
import SavedPosts from "./components/posts/SavedPosts";


function App() {
  //get the token from the localstorage
  const {token}=useStateContext();
  const user=JSON.parse(localStorage.getItem("user"));
  const Layout=()=>{
    return(
      <div>
        <NavBar user={user}/>
        <div className="flex justify-evenly w-screen">
          <LeftBar/>
           <Outlet/>
          <RightBar/>
        </div>
      </div>
    )
  }

  const ProtectedRout=({children})=>{
    if(!token){
      return <Navigate to="/login"/>
    }
    return children;
  }

  const router=createBrowserRouter([
    {
      path:"/",
      element:<ProtectedRout><Layout/></ProtectedRout>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/profile/:id",
          element:<Profile/>
        },{
          path:"/createPost",
          element:<CreatePost/>
        },
        {
          path:"/settings",
          element:<Settings/>
        },
        {
          path:"/savedPosts",
          element:<SavedPosts/>
        }
      ]
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<SignUp/>
    }
  ])

  return (
      <RouterProvider router={router}/>
  )
}

export default App;
