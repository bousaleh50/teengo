import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import axios from 'axios';

function NavBar({user}) {
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:4000/users/").then((res)=>{
            setUsers(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    },[]);
    return (
        <div className="flex justify-between items-center z-50  border-b sticky -top-2 bg-white ">
            <div className='flex items-center gap-8 p-5 w-full justify-evenly md:p-2 md:gap-8 md:justify-start'>
                <Link to="/">
                    <h1 className="text-blue-600 text-3xl">TeenGo</h1>
                </Link>
                {/*<HomeOutlinedIcon className="hover:text-blue-600 md:hidden"/>*/}
                <div className='flex justify-center flex-1'>
                    <Stack spacing={2} sx={{ width: 300 }}>
                    <Autocomplete
                       className=''
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={users.map((option) => option.first_name)}
                        renderInput={(params) => (
                        <TextField
                            
                            {...params}
                            label="Search"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                        )}
                    />
                    </Stack>
                </div>
            </div>
            <div className="mr-5">
               <div className='hidden md:flex md:gap-5 md:items-center'>
                <Link to="/CreatePost">
                    <AddCircleOutlineOutlinedIcon className="hover:text-blue-600 md:hidden"/>
                </Link>
                <NotificationsNoneOutlinedIcon className="hover:text-blue-600"/>
                <Link to={`/profile/${user._id}`}>
                  <AccountCircleOutlinedIcon className="hover:text-blue-600"/>
                </Link>
               </div>
               <div className='px-2 md:hidden'>
                <MenuOutlinedIcon className="hover:text-blue-600"/>
               </div>
            </div>
        </div>
    );
}

export default NavBar;