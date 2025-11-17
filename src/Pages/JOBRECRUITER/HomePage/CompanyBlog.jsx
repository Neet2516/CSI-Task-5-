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
                    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M26.9999 2.96658e-10C30.5456 -1.66202e-05 34.0566 0.698345 37.3324 2.05521C40.6082 3.41208 43.5847 5.40088 46.0919 7.90805C48.599 10.4152 50.5879 13.3917 51.9447 16.6675C53.3016 19.9433 54 23.4542 54 26.9999C54 41.9116 41.9116 54 26.9999 54C12.0884 54 0 41.9116 0 26.9999C0 12.0884 12.0884 2.96658e-10 26.9999 2.96658e-10ZM29.7 29.7H24.3C17.6156 29.7 11.8769 33.7484 9.40169 39.5273C13.318 45.019 19.7408 48.6 26.9999 48.6C34.2591 48.6 40.6818 45.019 44.5983 39.527C42.1231 33.7484 36.3844 29.7 29.7 29.7ZM26.9999 8.09999C22.5265 8.09999 18.8999 11.7265 18.8999 16.2C18.8999 20.6735 22.5265 24.3 26.9999 24.3C31.4734 24.3 35.0999 20.6735 35.0999 16.2C35.0999 11.7265 31.4735 8.09999 26.9999 8.09999Z" fill="#15294B"/>
</svg>


                    <input 
                        type="text" 
                        placeholder="Start a post..." 
                        className="grow p-2 text-sm border border-gray-300 rounded-full focus:outline-none cursor-pointer" 
                        onClick={() => setIsModalOpen(true)} // Opens the modal/form
                        readOnly // Makes the input non-editable directly
                    />
                </div>
                
                <div className="flex justify-center space-x-6 text-black font-semibold text-sm">
                    <span className="flex items-center cursor-pointer hover:text-blue-600">
                        <span className="text-lg text-black font-bold mr-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" d="M15 13.4996L19.276 15.6376C19.3522 15.6758 19.437 15.6938 19.5221 15.6901C19.6073 15.6863 19.6901 15.6608 19.7627 15.616C19.8352 15.5712 19.8951 15.5086 19.9367 15.4341C19.9782 15.3597 20 15.2758 20 15.1906V8.80858C20 8.72331 19.9782 8.63947 19.9367 8.565C19.8951 8.49054 19.8352 8.42794 19.7627 8.38315C19.6901 8.33836 19.6073 8.31286 19.5221 8.30908C19.437 8.30531 19.3522 8.32338 19.276 8.36158L15 10.4996V13.4996Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 6.25C4.90326 6.25 4.33097 6.48705 3.90901 6.90901C3.48705 7.33097 3.25 7.90326 3.25 8.5V15.5C3.25 16.0967 3.48705 16.669 3.90901 17.091C4.33097 17.5129 4.90326 17.75 5.5 17.75H13.5C14.0967 17.75 14.669 17.5129 15.091 17.091C15.5129 16.669 15.75 16.0967 15.75 15.5V14.713L18.941 16.309C19.1316 16.4043 19.3433 16.4493 19.5562 16.4397C19.769 16.4301 19.9759 16.3663 20.1572 16.2543C20.3384 16.1423 20.488 15.9858 20.5918 15.7997C20.6955 15.6136 20.75 15.4041 20.75 15.191V8.809C20.75 8.59593 20.6955 8.38641 20.5918 8.20031C20.488 8.01422 20.3384 7.85774 20.1572 7.74572C19.9759 7.63371 19.769 7.56988 19.5562 7.56031C19.3433 7.55073 19.1316 7.59572 18.941 7.691L15.75 9.286V8.5C15.75 7.90326 15.5129 7.33097 15.091 6.90901C14.669 6.48705 14.0967 6.25 13.5 6.25H5.5ZM15.75 10.964V13.036L19.25 14.786V9.213L15.75 10.964ZM14.25 8.5C14.25 8.30109 14.171 8.11032 14.0303 7.96967C13.8897 7.82902 13.6989 7.75 13.5 7.75H5.5C5.30109 7.75 5.11032 7.82902 4.96967 7.96967C4.82902 8.11032 4.75 8.30109 4.75 8.5V15.5C4.75 15.914 5.086 16.25 5.5 16.25H13.5C13.6989 16.25 13.8897 16.171 14.0303 16.0303C14.171 15.8897 14.25 15.6989 14.25 15.5V8.5Z" fill="black"/>
</svg>
</span> Video
                    </span>
                    <span className="flex items-center cursor-pointer hover:text-blue-600">
                        <span className="text-lg mr-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 17H18L14.25 12L11.25 16L9 13L6 17ZM3 21V3H21V21H3Z" fill="black"/>
</svg>

                            </span> Photo
                    </span>
                    <span className="flex items-center cursor-pointer hover:text-blue-600">
                        <span className="text-lg mr-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 6.5C9.5 6.30109 9.57902 6.11032 9.71967 5.96967C9.86032 5.82902 10.0511 5.75 10.25 5.75H16.75C16.9489 5.75 17.1397 5.82902 17.2803 5.96967C17.421 6.11032 17.5 6.30109 17.5 6.5C17.5 6.69891 17.421 6.88968 17.2803 7.03033C17.1397 7.17098 16.9489 7.25 16.75 7.25H10.25C10.0511 7.25 9.86032 7.17098 9.71967 7.03033C9.57902 6.88968 9.5 6.69891 9.5 6.5ZM14.138 8.75H16.362C16.422 8.75 16.492 8.75 16.555 8.755C16.654 8.76276 16.7506 8.78887 16.84 8.832C16.9812 8.90393 17.0961 9.01875 17.168 9.16C17.2136 9.24845 17.2399 9.34561 17.245 9.445C17.25 9.508 17.25 9.579 17.25 9.638V11.362C17.25 11.422 17.25 11.492 17.245 11.555C17.2374 11.6543 17.2112 11.7513 17.168 11.841C17.0959 11.9819 16.9811 12.0963 16.84 12.168C16.7506 12.2111 16.654 12.2372 16.555 12.245C16.492 12.25 16.421 12.25 16.362 12.25H14.138C14.078 12.25 14.008 12.25 13.945 12.245C13.8457 12.2374 13.7487 12.2112 13.659 12.168C13.5183 12.0962 13.4038 11.9817 13.332 11.841C13.2888 11.7513 13.2626 11.6543 13.255 11.555C13.25 11.492 13.25 11.421 13.25 11.362V9.638C13.25 9.578 13.25 9.508 13.255 9.445C13.2628 9.34605 13.2889 9.2494 13.332 9.16C13.4037 9.01891 13.5181 8.9041 13.659 8.832C13.7487 8.78876 13.8457 8.76264 13.945 8.755C14.008 8.75 14.079 8.75 14.138 8.75ZM14.25 9.75V11.25H16.25V9.75H14.25ZM9.75 9.5C9.75 9.36739 9.80268 9.24021 9.89645 9.14645C9.99021 9.05268 10.1174 9 10.25 9H11.5C11.6326 9 11.7598 9.05268 11.8536 9.14645C11.9473 9.24021 12 9.36739 12 9.5C12 9.63261 11.9473 9.75979 11.8536 9.85355C11.7598 9.94732 11.6326 10 11.5 10H10.25C10.1174 10 9.99021 9.94732 9.89645 9.85355C9.80268 9.75979 9.75 9.63261 9.75 9.5ZM10.25 11.25C10.1174 11.25 9.99021 11.3027 9.89645 11.3964C9.80268 11.4902 9.75 11.6174 9.75 11.75C9.75 11.8826 9.80268 12.0098 9.89645 12.1036C9.99021 12.1973 10.1174 12.25 10.25 12.25H11.5C11.6326 12.25 11.7598 12.1973 11.8536 12.1036C11.9473 12.0098 12 11.8826 12 11.75C12 11.6174 11.9473 11.4902 11.8536 11.3964C11.7598 11.3027 11.6326 11.25 11.5 11.25H10.25ZM9.75 14.5C9.75 14.3674 9.80268 14.2402 9.89645 14.1464C9.99021 14.0527 10.1174 14 10.25 14H16.75C16.8826 14 17.0098 14.0527 17.1036 14.1464C17.1973 14.2402 17.25 14.3674 17.25 14.5C17.25 14.6326 17.1973 14.7598 17.1036 14.8536C17.0098 14.9473 16.8826 15 16.75 15H10.25C10.1174 15 9.99021 14.9473 9.89645 14.8536C9.80268 14.7598 9.75 14.6326 9.75 14.5Z" fill="black"/>
<path d="M16.321 3H10.68C10.138 3 9.7 3 9.347 3.029C8.982 3.059 8.662 3.122 8.366 3.272C7.89535 3.51173 7.51272 3.89435 7.273 4.365C7.123 4.661 7.06 4.981 7.03 5.345C7 5.7 7 6.138 7 6.68V17H4.5C4.36739 17 4.24021 17.0527 4.14645 17.1464C4.05268 17.2402 4 17.3674 4 17.5C4 19.122 4.548 20.036 5.2 20.525C5.514 20.761 5.829 20.879 6.066 20.938C6.206 20.973 6.349 20.998 6.493 21C8.15 21.012 13.68 21 16.616 21C17.305 21 18.001 21.05 18.635 20.727C19.448 20.313 19.899 19.542 19.971 18.654C20 18.3 20 17.864 20 17.322V6.679C20 6.137 20 5.699 19.971 5.346C19.941 4.981 19.878 4.661 19.727 4.365C19.4875 3.89451 19.1053 3.5119 18.635 3.272C18.339 3.122 18.019 3.059 17.655 3.029C17.3 3 16.863 3 16.321 3ZM16.799 19.725C16.451 19.464 15.999 18.878 15.999 17.5C15.999 17.3674 15.9463 17.2402 15.8526 17.1464C15.7588 17.0527 15.6316 17 15.499 17H8V6.7C8 6.132 8 5.736 8.026 5.427C8.05 5.125 8.096 4.951 8.163 4.819C8.30685 4.53651 8.53651 4.30685 8.819 4.163C8.951 4.096 9.125 4.05 9.427 4.026C9.736 4 10.132 4 10.7 4H16.3C16.868 4 17.265 4 17.573 4.026C17.875 4.05 18.049 4.096 18.181 4.163C18.4635 4.30685 18.6931 4.53651 18.837 4.819C18.904 4.951 18.95 5.125 18.974 5.427C19 5.736 19 6.132 19 6.7V17.3C19 17.868 19 18.265 18.974 18.573C18.93 19.119 18.688 19.578 18.181 19.837C17.731 20.066 17.2 20.026 16.799 19.725ZM15.68 20H6.506C6.24893 19.9803 6.00353 19.8846 5.801 19.725C5.498 19.498 5.117 19.025 5.023 18H15.019C15.089 18.896 15.342 19.542 15.682 20" fill="black"/>
</svg>

                            </span> Write article
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