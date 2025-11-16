// CompanyBlog.js
import React, { useState } from 'react';
import PostCard from './PostCard'; 

// Placeholder images for the new post feature
import defaultUserImage from './companyblog/user_placeholder_image.png'; 
import googlebuild from './companyblog/googlebuild.png'; 
import microsoftbuild from './companyblog/microsoftbuild.png'; 
// NOTE: Make sure to create or adjust paths for 'user_placeholder_image.png'

const initialCompanyPosts = [
    {
        id: 1, // Unique ID for keying
        company: "Google",
        followers: "45,556,204",
        time: "14m",
        motto: "Exciting career openings now live! Join our growing global team.",
        imageSrc: googlebuild,
        imageAlt: "Google logo on building glass facade",
        primaryColor: "#4285f4",
        logoLetter: "G"
    },
    {
        id: 2,
        company: "Microsoft",
        followers: "68,595,754",
        time: "7m",
        motto: "Exciting career openings now live! Be part of Microsoft's mission to empower every person and organization.",
        imageSrc: microsoftbuild,
        imageAlt: "Microsoft building with logo",
        primaryColor: "#00a4ef",
        logoLetter: "M"
    }
];

const CompanyBlog = () => {
    // State to hold all posts (initial company posts + user-created posts)
    const [posts, setPosts] = useState(initialCompanyPosts);
    // State to control the visibility of the post creation modal/form
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State to capture the new post content
    const [newPostContent, setNewPostContent] = useState('');

    // Function to handle post creation
    const handleCreatePost = (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!newPostContent.trim()) {
            alert("Post content cannot be empty.");
            return;
        }

        const newPost = {
            id: Date.now(), // Use timestamp as a unique ID
            company: "New User Post", // Fixed company name for the user
            followers: "1,200", // Example followers count for the user
            time: "just now",
            motto: newPostContent,
            imageSrc: defaultUserImage, // Use a generic image for user posts
            imageAlt: "User-uploaded content",
            primaryColor: "#333333", // Generic user color
            logoLetter: "U" // 'U' for User
        };

        // Add the new post to the beginning of the list
        setPosts([newPost, ...posts]);
        
        // Reset and close
        setNewPostContent('');
        setIsModalOpen(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 font-sans">
            
            {/* Top Navigation/Post Creation Area (Clickable Input) */}
            <div className="bg-white p-4 rounded-lg mb-6 max-w-[500px] mx-auto shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                    {/* Profile Icon */}
                    <svg className="w-8 h-8 text-gray-500 rounded-full bg-gray-100 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.98 5.98 0 0010 16a5.979 5.979 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Start a post..." 
                        className="grow p-2 text-sm border border-gray-300 rounded-full focus:outline-none cursor-pointer" 
                        onClick={() => setIsModalOpen(true)} // Opens the modal/form
                        readOnly // Makes the input non-editable directly
                    />
                </div>
                
                <div className="flex justify-center space-x-6 text-gray-600 text-sm">
                    <span className="flex items-center cursor-pointer hover:text-blue-600">
                        <span className="text-lg mr-1">📹</span> Video
                    </span>
                    <span className="flex items-center cursor-pointer hover:text-blue-600">
                        <span className="text-lg mr-1">📷</span> Photo
                    </span>
                    <span className="flex items-center cursor-pointer hover:text-blue-600">
                        <span className="text-lg mr-1">✍️</span> Write article
                    </span>
                </div>
            </div>
            {/* --- */}

            {/* Post Creation Modal/Form (Conditional Rendering) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Create New Post</h3>
                        <form onSubmit={handleCreatePost}>
                            <textarea
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder="What's on your mind?..."
                                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-sm"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* --- */}

            {/* Companies Header and Sorting */}
            <div className="flex justify-between items-end mb-4">
                <div className="flex">
                    <button className="bg-[#24375b] text-white py-2 px-6 font-semibold text-sm rounded-t-lg">
                        Companies
                    </button>
                </div>
                <div className="text-gray-500 text-xs">
                    Short by: <span className="font-bold cursor-pointer hover:text-black">Top</span> <span className="text-gray-400">|</span> <span className="font-bold cursor-pointer hover:text-black">J1</span>
                    <span className="ml-4 text-sm text-gray-600 cursor-pointer hover:underline">View all</span>
                </div>
            </div>

            {/* Posts Container: Maps over the combined posts array */}
            <div className="flex flex-wrap justify-between">
                {posts.map((post) => (
                    <PostCard 
                        key={post.id} 
                        {...post} 
                    />
                ))}
            </div>
            
        </div>
    );
};

export default CompanyBlog;