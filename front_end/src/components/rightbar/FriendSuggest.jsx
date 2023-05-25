export function FriendSuggest({userPic,userName}) {
    return (
        <div className="sm:flex sm:flex-wrap sm:gap-5 lg:flex-row md:justify-between items-center md:gap-2 md:p-3 ">
           <div className="flex gap-2 items-center">
             <img src={userPic} alt="youness profile picture" className="md:w-5 md:h-5 md:rounded-full md:cursor-pointer object-cover" />
             <span className="md:cursor-pointer">{userName}</span>
           </div>
           <div className="flex gap-2">
            <button className="sm:p-0 md:ml-auto md:bg-blue-500 md:p-1 md:rounded-md md:text-white">Accept</button>
            <button className="sm:p-0 md:ml-auto md:bg-red-500 md:p-1 md:rounded-md md:text-white">Dismiss</button>
           </div>
        </div>
    );
}

export function FriendRequest({userName,userPic}) {
    return (
        <div className="sm:flex sm:flex-wrap sm:gap-5 lg:flex-row md:justify-between items-center md:gap-2 md:p-3 ">
           <div className="flex gap-2 items-center">
             <img src={userPic} alt="youness profile picture" className="md:w-5 md:h-5 md:rounded-full md:cursor-pointer object-cover" />
             <span className="md:cursor-pointer">{userName}</span>
           </div>
           <div className="flex gap-2">
            <button className="sm:p-0 md:ml-auto md:bg-blue-500 md:p-1 md:rounded-md md:text-white">Accept</button>
            <button className="sm:p-0 md:ml-auto md:bg-red-500 md:p-1 md:rounded-md md:text-white">Dismiss</button>
           </div>
        </div>
    );
}

export function OnlineFreinds({userPic,userName}){
    return(
        <div>
            <div className="flex gap-2 items-center cursor-pointer">
                <img src={userPic} className="md:w-5 md:h-5 md:rounded-full md:cursor-pointer object-cover" alt="" />
                <div className="bg-green-500 w-2 h-2 relative -top-2 -left-3 rounded-full"></div>
                <span>{userName}</span>
            </div>
        </div>
    )
}
