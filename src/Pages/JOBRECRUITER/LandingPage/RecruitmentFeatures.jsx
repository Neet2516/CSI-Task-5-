import React from 'react';
import { Zap, UserCheck, BarChart2, UploadCloud, MessageSquare, Briefcase } from 'lucide-react'; 
// Using lucide-react for the icons

// --- Reusable Feature Card Component ---
const FeatureCard = ({ icon: Icon, iconColor, title, description }) => {
    return (
        <div className="w-full px-3 mb-6 md:w-1/2 lg:w-1/3">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl transition duration-300 h-full hover:bg-purple-100 flex flex-col items-center text-center border border-gray-100">
                
                {/* Icon Circle */}
                <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6`}
                    style={{ backgroundColor: iconColor.bg }}
                >
                    <Icon className="w-8 h-8" style={{ color: iconColor.fg }} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed grow">
                    {description}
                </p>
            </div>
        </div>
    );
};
const ai=({className})=>(
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#6C63FF"/>
<path d="M31.9993 45.3337C39.3631 45.3337 45.3327 39.3641 45.3327 32.0003C45.3327 24.6365 39.3631 18.667 31.9993 18.667C24.6356 18.667 18.666 24.6365 18.666 32.0003C18.666 39.3641 24.6356 45.3337 31.9993 45.3337Z" stroke="white" stroke-width="2.66667" strokeLinecap="round" stroke-linejoin="round"/>
<path d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z" stroke="white" strokeWidth="2.66667" stroke-linecap="round" strokeLinejoin="round"/>
<path d="M32.0007 34.6663C33.4734 34.6663 34.6673 33.4724 34.6673 31.9997C34.6673 30.5269 33.4734 29.333 32.0007 29.333C30.5279 29.333 29.334 30.5269 29.334 31.9997C29.334 33.4724 30.5279 34.6663 32.0007 34.6663Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
const verifiedjobseeker =({className})=>(
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#FBBC05"/>
<path d="M37.3327 44V41.3333C37.3327 39.9188 36.7708 38.5623 35.7706 37.5621C34.7704 36.5619 33.4138 36 31.9993 36H23.9993C22.5849 36 21.2283 36.5619 20.2281 37.5621C19.2279 38.5623 18.666 39.9188 18.666 41.3333V44" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M37.334 20.1709C38.4777 20.4674 39.4905 21.1353 40.2136 22.0696C40.9366 23.004 41.3289 24.1521 41.3289 25.3336C41.3289 26.515 40.9366 27.6631 40.2136 28.5975C39.4905 29.5319 38.4777 30.1997 37.334 30.4962" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M45.334 43.9995V41.3329C45.3331 40.1512 44.9398 39.0032 44.2158 38.0693C43.4918 37.1353 42.4782 36.4683 41.334 36.1729" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.9993 30.6667C30.9449 30.6667 33.3327 28.2789 33.3327 25.3333C33.3327 22.3878 30.9449 20 27.9993 20C25.0538 20 22.666 22.3878 22.666 25.3333C22.666 28.2789 25.0538 30.6667 27.9993 30.6667Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


);
const dashboardpng=({className})=>(
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#F54900"/>
<path d="M20 20V41.3333C20 42.0406 20.281 42.7189 20.781 43.219C21.2811 43.719 21.9594 44 22.6667 44H44" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40 38.6667V28" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.334 38.667V22.667" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.666 38.667V34.667" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
const bulkpost=({clasName})=>(
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#99A1AF"/>
<path d="M32 20V36" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M38.6673 26.6667L32.0007 20L25.334 26.6667" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M44 36V41.3333C44 42.0406 43.719 42.7189 43.219 43.219C42.7189 43.719 42.0406 44 41.3333 44H22.6667C21.9594 44 21.2811 43.719 20.781 43.219C20.281 42.7189 20 42.0406 20 41.3333V36" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);
const chats =({clasName})=>(
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#DEB8DC"/>
<path d="M45.3327 38.6667C45.3327 39.3739 45.0517 40.0522 44.5516 40.5523C44.0515 41.0524 43.3733 41.3333 42.666 41.3333H25.1033C24.3962 41.3335 23.718 41.6145 23.218 42.1147L20.282 45.0507C20.1496 45.183 19.981 45.2732 19.7973 45.3097C19.6137 45.3462 19.4234 45.3275 19.2504 45.2558C19.0775 45.1842 18.9296 45.0629 18.8256 44.9072C18.7216 44.7516 18.666 44.5685 18.666 44.3813V22.6667C18.666 21.9594 18.947 21.2811 19.4471 20.781C19.9472 20.281 20.6254 20 21.3327 20H42.666C43.3733 20 44.0515 20.281 44.5516 20.781C45.0517 21.2811 45.3327 21.9594 45.3327 22.6667V38.6667Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
const branding =({clasName})=>(
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z" fill="#20C6B1"/>
<path d="M36.6357 33.1865L38.6557 44.5545C38.6783 44.6884 38.6595 44.826 38.6018 44.9489C38.5442 45.0718 38.4503 45.1741 38.3329 45.2423C38.2155 45.3104 38.0801 45.341 37.9447 45.3301C37.8094 45.3192 37.6807 45.2673 37.5757 45.1812L32.8023 41.5985C32.5719 41.4264 32.292 41.3334 32.0043 41.3334C31.7167 41.3334 31.4368 41.4264 31.2063 41.5985L26.425 45.1799C26.3201 45.2658 26.1915 45.3177 26.0563 45.3286C25.9212 45.3395 25.7859 45.309 25.6686 45.241C25.5512 45.1731 25.4574 45.071 25.3996 44.9483C25.3418 44.8256 25.3227 44.6883 25.345 44.5545L27.3637 33.1865" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32 34.667C36.4183 34.667 40 31.0853 40 26.667C40 22.2487 36.4183 18.667 32 18.667C27.5817 18.667 24 22.2487 24 26.667C24 31.0853 27.5817 34.667 32 34.667Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

// --- Main Component ---
const RecruitmentFeatures = () => {
    // Data structured to match the design (colors, icons, text)
    const features = [
        {
            icon: ai,
            iconColor: { bg: '#eef2ff', fg: '#6366f1' }, // Indigo/Violet
            title: "AI-Powered Matching",
            description: "Get instant matches for your job openings with our intelligent candidate recommendation system",
        },
        {
            icon: verifiedjobseeker,
            iconColor: { bg: '#fffbe6', fg: '#f59e0b' }, // Yellow/Amber
            title: "Verified Job Seekers",
            description: "Access a pool of verified and skilled professionals ready to join your team",
        },
        {
            icon: dashboardpng,
            iconColor: { bg: '#fef2f2', fg: '#ef4444' }, // Red/Orange (using a common orange-red for the bar chart)
            title: "Analytics Dashboard",
            description: "Track views, applications, and hiring performance with real-time insights",
        },
        {
            icon: bulkpost,
            iconColor: { bg: '#f0f9ff', fg: '#3b82f6' }, // Blue
            title: "Bulk Job Posting",
            description: "Post multiple jobs easily and manage all your openings from one central hub",
        },
        {
            icon: chats,
            iconColor: { bg: '#f3e8ff', fg: '#a855f7' }, // Purple/Pink
            title: "Collaboration Tools",
            description: "Add hiring team members to manage recruitment together seamlessly",
        },
        {
            icon: branding,
            iconColor: { bg: '#ecfdf5', fg: '#10b981' }, // Teal/Green
            title: "Employer Branding",
            description: "Build and showcase your company culture to attract the best talent",
        },
    ];

    return (
        <section className="bg-[#f1f5fa] py-16 md:py-24 px-4 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Header and Subtitle */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                        Why Recruit on NextStep?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Streamline your hiring process with powerful tools designed to connect you with top talent efficiently
                    </p>
                </div>

                {/* Feature Cards Grid (3 columns on large screens, 2 on medium) */}
                <div className="flex flex-wrap -mx-3 justify-center">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            iconColor={feature.iconColor}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default RecruitmentFeatures;