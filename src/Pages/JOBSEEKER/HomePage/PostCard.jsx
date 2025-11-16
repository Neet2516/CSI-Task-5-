// PostCard.js
import React from 'react';

// NOTE: The image source is passed as a prop from CompanyBlog.js
const PostCard = ({ company, followers, time, motto, imageSrc, imageAlt, primaryColor, logoLetter }) => {
    return (
        // Post Container: Adjusted width for a clean two-column layout on medium screens and up
        <div className="w-full sm:w-[48.5%] border border-gray-200 rounded-lg bg-white shadow-md font-sans text-gray-800 mb-5">
            
            {/* Header Section (Company Info and Menu) */}
            <div className="flex justify-between items-center p-4 pb-1">
                <div className="flex items-center">
                    {/* Logo/Icon Area - Using dynamic color for the initial letter */}
                    <div 
                        className={`w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center text-2xl font-bold border border-gray-200 mr-2`}
                        style={{ color: primaryColor }} 
                    >
                        {logoLetter}
                    </div>
                    {/* Company Details */}
                    <div className="flex flex-col text-sm">
                        <span className="font-bold text-black text-base">{company}</span>
                        <span className="text-gray-600 text-xs">{followers} followers</span>
                        <span className="text-gray-600 text-xs">{time} • 🌍</span> {/* Time and Public icon */}
                    </div>
                </div>
                {/* Menu/More Icon */}
                <div className="text-xl text-gray-500 cursor-pointer">•••</div>
            </div>

            {/* Post Content/Motto */}
            <div className="p-4 pt-1">
                <p className="text-lg font-medium leading-relaxed text-black">
                    "{motto}"
                </p>
            </div>

            {/* Image Section */}
            <div className="pb-2 border-t border-gray-200">
                <img 
                    // This is where the image is rendered using the prop
                    src={imageSrc} 
                    alt={imageAlt}
                    className="w-full h-auto block" 
                />
            </div>

            {/* Footer Section - Actions (Like, Comment, Save/Download, Share) */}
            <div className="flex justify-between items-center px-4 py-2 pt-2 border-t border-gray-200">
                <div className="flex space-x-4 text-xl">
                    <span className="icon cursor-pointer text-gray-700">🖤</span> 
                    <span className="icon cursor-pointer text-gray-700">💬</span> 
                    <span className="icon cursor-pointer text-gray-700">⬇️</span> 
                </div>
                <div className="flex items-center text-sm font-bold text-gray-600 cursor-pointer">
                    <span className="mr-1">Share</span>
                    <span className="share-icon text-base">↪️</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;