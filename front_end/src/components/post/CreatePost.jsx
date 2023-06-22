import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreatePost() {

    const Navigate = useNavigate()

    const user=JSON.parse(localStorage.getItem("user"))

  const [post, setPost] = useState({
    content: "",
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("content", post.content);
      //formData.append("file", post.file);
      const response = await axios.post(`http://localhost:4000/posts/create-post/${user._id}`, formData);
      console.log(response.data); // Handle the response as needed
      Navigate('/')
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        <div className="mb-4">
            <label htmlFor="">your text :</label>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            className="w-full p-2 border border-gray-300"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="border border-gray-300 p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
