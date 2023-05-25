import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link } from 'react-router-dom';

function NavBar({user}) {
    return (
        <div className="flex justify-between items-center z-50  border-b sticky -top-2 bg-white ">
            <div className='flex items-center gap-8 p-5 w-full justify-evenly md:p-2 md:gap-8 md:justify-start'>
                <Link to="/">
                    <h1 className="text-blue-600 text-3xl">TeenGo</h1>
                </Link>
                {/*<HomeOutlinedIcon className="hover:text-blue-600 md:hidden"/>*/}
                <div className='flex sm:flex border rounded-md p-1 w-fit gap-5 md:m-auto md:w-2/3'>
                    <SearchOutlinedIcon className="hover:text-blue-600"/>
                    <input type="search" name="search" className='outline-none w-full' placeholder='search'/>
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