import Youness from "../../assets/pexels-mohamed-abdelghaffar-771742.jpg";
import Abderhman from "../../assets/pexels-pixabay-220453.jpg";
import { FriendRequest, FriendSuggest, OnlineFreinds } from "./FriendSuggest";

function RightBar() {

    return (
        <div className="hidden z-50 xl:flex xl:flex-col xl:gap-5 xl:fixed xl:right-0 xl:p-3 xl:top-15 xl:h-screen xl:w-1/4 bg-gray-100">
            <div className="md:bg-white md:rounded-md md:shadow-md md:flex md:flex-col ">
                <span className="text-gray-400 md:p-3">Suggestion For You</span>
                <div className="">
                    <FriendSuggest userPic={Youness} userName="Youness Essaja"/>
                    <FriendSuggest userPic={Abderhman} userName="Abdo Dernoud"/>
                </div>
            </div>
            <div className="md:bg-white md:rounded-md md:shadow-md md:flex md:flex-col ">
                <span className="text-gray-400 md:p-3">Frend Request</span>
                <div className="">
                    <FriendRequest userName="Ahmed Bousaleh" userPic={Youness}/>
                    <FriendRequest userName="Ahmed Bousaleh" userPic={Youness}/>
                </div>
            </div>
            <div className="md:bg-white md:rounded-md md:shadow-md md:flex md:flex-col ">
                <span className="text-gray-400 md:p-3">Online Friends</span>
                <div className="flex flex-col gap-4 p-5">
                    <OnlineFreinds userName="Ahmed Bousaleh" userPic={Youness}/>
                    <OnlineFreinds userName="Ahmed Bousaleh" userPic={Youness}/>
                </div>
            </div>
        </div>
    );
}

export default RightBar;