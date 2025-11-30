import React, { useState } from 'react'
import toast from 'react-hot-toast';
import AllPost from './AllPost';
const Post = () => {
    const  token=  localStorage.getItem("accessToken");
    const [text,setText]=useState("");
    const namechange=(e)=>{
        e.preventDefault();
        setText(e.target.value);
    }
     const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.type !== "image/png") {
        toast.error ("Enter valid image")
      return;
    }
    setImage(file); 
  };
    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!text.trim()) {
    toast.error("Please enter content");
    return;
  }

  if (!image) {
    toast.error("Please upload an image");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("content", text);
    formData.append("file", image);

    const res = await fetch("https://job-portal-my15.onrender.com/api/posts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.text();
      console.log("ERROR:", err);
      toast.error("Bad Request — check fields!");
      return;
    }

    const data = await res.json();
    toast.success("Post created!");

    console.log("Success:", data);

  } catch (error) {
    toast.error("Error creating post");
    console.error(error);
  }
};

  return (
    <div className='flex flex-col mt-10   text-black  w-full'>
        <div className='w-full flex items-center justify-center'>
            <form action="submit"  className='flex flex-col items-center justify-center border-2 border-blue-950 w-1/3  px-10 pb-5 pt-5 rounded-2xl'>
                <h1 className='text-2xl font-bold text-center text-blue-950'>Create your own post</h1>
                <input type="text" placeholder='Enter text ' className='w-full border-2 border-blue-950 px-2 py-1 rounded-lg my-3' onChange={(e)=>{
                    namechange(e);
                }} value={text}></input>
                <input type="file" className='w-full border-2 border-blue-950 px-2 py-1 rounded-lg my-3'accept="image/png" 
        onChange={handleImageChange}/>
                <button type='submit' className='bg-blue-400 text-black font-semibold px-4 py-2 border-2 rounded-lg  hover:bg-blue-900 hover:text-white hover:scale-x-100' onClick={(e)=>{
                    handleSubmit(e);
                }}>Create post </button>
            </form>
        </div>
        <AllPost></AllPost>
    </div>
  )
}

export default Post
