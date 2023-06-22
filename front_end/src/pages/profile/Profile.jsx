import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import defaultCoverImage from "/src/assets/cover.jpg";
import defaultUserImage from "/src/assets/user.png";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [coverImage, setCoverImage] = useState(() => {
    const storedCoverImage = localStorage.getItem("coverImage");
    return storedCoverImage ? JSON.parse(storedCoverImage) : defaultCoverImage;
  });
  const [userImage, setUserImage] = useState(() => {
    const storedUserImage = localStorage.getItem("userImage");
    return storedUserImage ? JSON.parse(storedUserImage) : defaultUserImage;
  });
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}`, options)
      .then((res) => {
        const { user } = res.data;
        if (user) {
          setProfileUser(user);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
  };

  const handleUploadCoverImage = () => {
    const formData = new FormData();
    formData.append("coverImage", coverImage);

    const userId = id;

    axios
      .put(`http://localhost:4000/users/${userId}/cover-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("coverImage", JSON.stringify(coverImage));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUploadUserImage = () => {
    const formData = new FormData();
    formData.append("userImage", userImage);

    const userId = id;

    axios
      .put(`http://localhost:4000/users/${userId}/user-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userImage", JSON.stringify(userImage));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFollow = () => {
    // Handle follow logic
    // Perform the necessary actions when the user clicks the follow button
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="relative">
          <img
            className="w-full h-60 rounded-t-lg object-cover"
            src={coverImage === defaultCoverImage ? defaultCoverImage : URL.createObjectURL(coverImage)}
            alt=""
          />
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
              src={userImage === defaultUserImage ? defaultUserImage : URL.createObjectURL(userImage)}
              alt=""
            />
          </div>
        </div>
        <div className="text-center mt-8">
          <h4 className="text-2xl font-semibold mb-2">
            {profileUser.first_name} {profileUser.last_name}
          </h4>
          <div className="flex justify-center items-center text-gray-500 mb-4">
            <p className="mr-4">Followers: {user.followers.length}</p>
            <p className="ml-4">Following: {user.following.length}</p>
          </div>
          <p className="text-gray-600 mb-4">This place for my description!</p>
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleUploadCoverImage}
                disabled={!coverImage}
              >
                Upload Cover Image
              </button>
            </div>
            <div className="mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleUserImageChange}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleUploadUserImage}
                disabled={!userImage}
              >
                Upload User Image
              </button>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
            onClick={handleFollow}
          >
            Follow
            {/*isFollowing ? "Unfollow" : "Follow"*/}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
