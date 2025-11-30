import React, { useEffect, useState } from 'react'

const AllPost = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const posts = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch("https://job-portal-my15.onrender.com/api/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Server error:", res.status);
          return;
        }

        const data = await res.json();
        setPost(data);
        console.log(data);

      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    posts();
  }, []);

  return (
    <div className='mt-5 ml-10'>
      <div className='text-2xl text-blue-950 pb-2 border-b'>Recent Post</div>
      <div className='flex flex-wrap items-center justify-center w-full gap-5'>
      {post && post.length > 0 ? (
        post.map((item) => (
          <div key={item._id} className='border-2 flex flex-col border-blue-950 rounded-lg p-4 my-4 w-1/4'>
           
            <div className='font-bold text-lg mb-2 border-b pb-1 flex items-center justify-between'>
              <span className="text-white bg-blue-950 rounded-full w-10 h-10 flex items-center justify-center">
  <span className="text-lg font-semibold">{item.author.name[0]}</span>
</span>
 {item?.author?.name} 
            </div>
            <div className='mb-2 '>"{item?.content}"</div>
            <div className=''>
              {item?.imageUrl && (
                <img src={item.imageUrl} alt="Post" className='w-full  h-auto  rounded-lg' />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="mt-4 text-gray-500">No posts found.</div>
      )}
      </div>

    </div>
  );
};

export default AllPost;
