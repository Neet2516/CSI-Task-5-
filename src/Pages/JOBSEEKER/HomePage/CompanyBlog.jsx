import React from 'react';
import googlebuild from './companyblog/googlebuild.png';
import google from './companyblog/google.png'
const CompanyBlog = () => {
    return (
        <div className="w-70 border border-gray-300 rounded-lg bg-white shadow-xl font-sans text-gray-800 mx-auto my-5">
            {/* Header Section */}
            <div className="flex justify-between items-center p-4 pb-1">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center text-2xl font-bold text-[#4285f4] border border-gray-200 mr-2">
                        G
                    </div>
                    <div className="flex flex-col text-sm">
                        <span className="font-bold text-black text-base">Google</span>
                        <span className="text-gray-600 text-xs">45,556,204 followers</span>
                        <span className="text-gray-600 text-xs">14m • <i className="public-icon">🌍</i></span>
                    </div>
                </div>
                <div className="text-xl text-gray-500 cursor-pointer">•••</div>
            </div>

            <div className="p-4 pt-1">
                <p className="text-lg font-medium leading-relaxed text-black">
                    "Exciting career openings now live! Join our growing global team."
                </p>
            </div>
            <div className="pb-2 border-t border-gray-200">
                <img 
                    src={googlebuild}
                    alt="Google logo on building glass facade" 
                    className="w-full h-auto block"
                />
            </div>

            {/* Footer Section - Actions */}
            <div className="flex justify-between items-center p-4 pt-2 border-t border-gray-200">
                <div className="flex space-x-4 text-xl">
                    <span className="icon cursor-pointer text-gray-700">🖤</span> {/* Like/Heart */}
                    <span className="icon cursor-pointer text-gray-700">💬</span> {/* Comment */}
                    <span className="icon cursor-pointer text-gray-700">⬇️</span> {/* Download/Save */}
                </div>
                <div className="flex items-center text-sm font-bold text-gray-600 cursor-pointer">
                    <span className="mr-1">Share</span>
                    <span className="share-icon">↪️</span>
                </div>
            </div>
        </div>
    );
};

export default CompanyBlog;