import axios from 'axios';
import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { NavLink } from 'react-router-dom';


function Settings() {
  const [open, setOpen] = React.useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const [userUpdated, setUserUpdated] = useState({
    ...user,
    first_name: user.first_name,
    last_name: user.last_name,
  });

  const [profilePic,setProfilePic]=useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file)
  };

  const handleClick = () => {
    setOpen(!open);
  };


  const handleSubmit = async (e) => {
    localStorage.setItem("user", JSON.stringify(userUpdated));
    await axios.put(`http://localhost:4000/users/update/${user._id}`,{...userUpdated,profilePic
  });
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserUpdated({...userUpdated, [name]: value});
  };

  return (
    <div className="flex flex-col w-1/2 h-full px-5 gap-10 sm:flex-row sm:h-screen md:pr-40 2xl:max-w-5xl">
      <List
      className='flex flex-col relative  left-10 bg-white'
      sx={{ width: '100vw',alignSelf:"center" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Settings
        </ListSubheader>
      }
    >
      <NavLink to="/savedPosts">
      <ListItemButton>
        <ListItemIcon>
          <BookmarkBorderOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="saved post" />
      </ListItemButton>
      </NavLink>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CreateOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Update Info" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{display:"flex",justifyContent:"center"}}>
            {/*<ListItemIcon>
              <StarBorder />
            </ListItemIcon>*/}
            <div className="flex flex-col  flex-1 p-5 min-h-fit gap-5 border rounded-md self-center shadow-lg bg-white">
              <div className="text-center">
                <h1 className="text-3xl">Update</h1>
              </div>
              <form className="flex flex-col gap-5 self-center" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="font-bold">First Name</label>
                  <input id="firstName" className="border p-2 rounded-md" value={userUpdated.first_name} type="text" name="first_name" onChange={handleChange} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName" className="font-bold">Last Name</label>
                  <input id="lastName" className="border p-2 rounded-md" value={userUpdated.last_name} type="text" name="last_name" onChange={handleChange} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName" className="font-bold">Profile Image</label>
                  <input id="profilePic" className="border p-2 rounded-md" accept="image/*" type="file" name="profilePic" onChange={handleFileChange} />
                </div>
                <button className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500">Update</button>
              </form>
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    </div>
  );
}

export default Settings;
