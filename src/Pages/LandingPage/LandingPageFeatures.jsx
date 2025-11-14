import React from 'react';
import heart from '../../assets/LandingPage/Features/heart.png'
// Reusable component for a single feature block
const FeatureItem = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4 p-4 md:p-6 rounded-xl transition duration-300 hover:shadow-lg">
        <div className="shrink-0 text-[#15294B] mt-1">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

// Inline SVG Icons
const Icons = {
    // Main Section Icons
    Mind: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21a9 9 0 0 0 9-9h-5c-1.1 0-2-.9-2-2V4a2 2 0 0 0-2-2 9 9 0 0 0-9 9c0 4.4 3.6 8 8 8z"></path>
            <path d="M16 17a5 5 0 0 0-5-5h-5"></path>
        </svg>
    ),
    Team: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    ),
    // Candidate Feature Icons
    AI: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
            <path d="M5 14h14"></path>
            <path d="M5 10h14"></path>
            <path d="M2 9v6"></path>
            <path d="M22 9v6"></path>
        </svg>
    ),
    Message: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    ),
    Profile: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="M10.5 17.5l-4-4-3 3v2h10l-3-3z"></path>
        </svg>
    ),
    // Recruiter Feature Icons
    CheckPool: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    ),
    JobPost: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
    ),
    Management: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3.83a2 2 0 0 1 .48-1.34l3-3a2 2 0 0 1 2.84 0l3 3a2 2 0 0 1 .48 1.34V18z"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    )
};

const LandingPageFeatures = () => {
    return (
        <div className="mt-10 min-h-screen bg-gray-50 p-4 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Section 1: Find the job you love (Candidate Focus) */}
                <div className="bg-[#f1f5fa] p-6 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex items-center justify-center space-x-3 mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
                            Find the job you love
                        </h2>
                        <span className="text-[#15294B]">
                            <img src={heart} className='h-12 w-12' alt="" />
                        </span>
                    </div>

                    <div className="grid grid-cols-1  gap-6">
                        <FeatureItem
                            icon={Icons.AI}
                            title="AI-Powered Matching"
                            description="Get matched with jobs that fit your skills and career aspirations instantly."
                        />
                        <FeatureItem
                            icon={Icons.Message}
                            title="Direct Messaging"
                            description="Connect directly with hiring managers and recruiters to ask questions and follow up."
                        />
                        <FeatureItem
                            icon={Icons.Profile}
                            title="Profile Builder"
                            description="Showcase your experience and achievements with a beautiful, professional profile."
                        />
                    </div>
                </div>

                {/* Section 2: Hire the talent you need (Recruiter Focus) */}
                <div className="bg-[#f1f5fa] p-6 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex items-center justify-center space-x-3 mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
                            Hire the talent you need
                        </h2>
                        <span className="text-[#15294B]">
                            {Icons.Team}
                        </span>
                    </div>

                    <div className="grid grid-cols-1  gap-6">
                        <FeatureItem
                            icon={Icons.CheckPool}
                            title="Vetted Candidate Pool"
                            description="Access thousands of qualified professionals who have been pre-screened for quality."
                        />
                        <FeatureItem
                            icon={Icons.JobPost}
                            title="Easy Job Posting"
                            description="Post openings quickly and easily using smart forms and customizable templates."
                        />
                        <FeatureItem
                            icon={Icons.Management}
                            title="Applicant Management"
                            description="Track and manage candidates through the entire hiring pipeline in one centralized place."
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LandingPageFeatures;