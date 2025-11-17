import React ,{useRef} from 'react'
import { Users, Award, BarChart3 } from 'lucide-react'
import landingimg from '../../../assets/JOBSEEKER/landingimg.png'
import Pattern from './Pattern';
import Trust from './Trust';
import Testimonials from './Testimonials';
import RecruitmentFeatures from './RecruitmentFeatures';
import { motion, useInView } from "framer-motion";
const BriefcaseIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

// Icon for Candidates (Users)
const UsersIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

// Icon for Companies (Building/Office)
const BuildingIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M10 21V11"></path>
        <path d="M14 21V11"></path>
        <path d="M7 21V11"></path>
        <path d="M17 21V11"></path>
        <path d="M2 7l10-5 10 5"></path>
    </svg>
);

// Search Icon for the button
const SearchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
    </svg>
);

const InstagramLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-600 p-2 border-2 border-pink-400 rounded-2xl shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
);

// Tesla Logo SVG (Simplified 'T' shield)
const TeslaLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-600 p-2 border-2 border-red-400 rounded-2xl shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L12 22M12 2L10 6M12 2L14 6M12 22L10 18M12 22L14 18M7 9C7 9-1 12 5 15C11 18 17 18 24 15C24 15 17 12 17 9" fill="currentColor"></path>
    </svg>
);

// McDonald's Logo SVG (Simplified Golden Arches, colored red/yellow)
const McDonaldsLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 p-2 border-2 border-yellow-400 rounded-2xl shadow-md" viewBox="0 0 24 24" fill="#DA291C">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="#FFFFFF"/>
        <path d="M4 14C4 8.477 8.477 4 14 4h0M4 10C4 15.523 8.477 20 14 20h0" stroke="#FFC300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M10 14C10 8.477 14.477 4 20 4h0M10 10C10 15.523 14.477 20 20 20h0" stroke="#FFC300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
);

// Apple Logo SVG (Simplified)
const AppleLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-800 p-2 border-2 border-gray-400 rounded-2xl shadow-md" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.75C13.1 1.75 14.12 2.22 14.9 3.12 15.67 4.02 16.14 5.04 16.14 6.14 16.14 7.24 15.67 8.26 14.9 9.16 14.12 10.06 13.1 10.53 12 10.53 10.9 10.53 9.88 10.06 9.1 9.16 8.33 8.26 7.86 7.24 7.86 6.14 7.86 5.04 8.33 4.02 9.1 3.12 9.88 2.22 10.9 1.75 12 1.75zM12 13.73c-2.4 0-4.63 1.18-6.14 3.17C4.35 18.9 4.3 22.25 4.3 22.25H19.7c0 0-.05-3.35-1.56-5.35-1.51-1.99-3.74-3.17-6.14-3.17z"/>
    </svg>
);


// Reusable Card Component
const CompanyCard = ({ logo: Logo, name, description, openJobs }) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl flex flex-col items-center text-center h-full border border-gray-100">
            
            {/* Logo */}
            <div className="mb-4">
                <Logo />
            </div>

            {/* Title */}
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">{name}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6 leading-relaxed grow">
                {description}
            </p>

            {/* Job Count */}
            <div className="mt-auto">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    {openJobs} open jobs
                </span>
            </div>
        </div>
    );
};



// =================================================================
// MAIN LANDING PAGE COMPONENT
// =================================================================

const JRLandingPage = () => {
    const stats = [
    {
        icon: Users,
        count: '1M+',
        label: 'Active Candidates',
        color: 'text-[#1c787a]', // Teal color
    },
    {
        icon: Award,
        count: '50K+',
        label: 'Verified Recruiters',
        color: 'text-[#1c787a]',
    },
    {
        icon: BarChart3,
        count: 'Fastest',
        label: 'Growing Platform',
        color: 'text-[#1c787a]',
    },
];
    // Data for the statistics section
   

    // Placeholder data for the select inputs
    const locations = ['New York', 'London', 'Remote', 'Bangalore'];
    const categories = ['Technology', 'Marketing', 'Finance', 'Healthcare'];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });
    return (
        <>
        <div className='bg-white flex flex-col gap-10'>
            {/* Hero Section */}
            <div className='relative w-full h-[600px] md:h-[700px] bg-white'>
                
                <div className='w-full h-full'>
                    <div 
                        className='w-full h-full bg-cover bg-center' 
                        style={{
                            backgroundImage: `url(${landingimg})`
                        }}
                    >
                        {/* Semi-transparent dark overlay for text contrast */}
                        <div className='w-full h-full bg-black opacity-40 absolute top-0 left-0'></div>
                    </div>
                </div>
                
                {/* Content Overlay */}
                <div className='absolute inset-0 flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-32 p-4 text-center z-10'>
            
            {/* Title and Subtitle */}
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-white mb-4 drop-shadow-lg text-left sm:text-center leading-tight'>
                    Hire the Right Talent Faster!
                </h1>
                <p className='text-lg md:text-[1rem] text-gray-200 mb-12 drop-shadow-md max-w-2xl text-left sm:text-center mx-auto'>
                    Post jobs, manage candidates, and build your employer brand — all in one place.
                </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-24'>
                <button
                    className="py-3 px-10 text-lg font-semibold rounded-lg bg-[#15294B] text-white hover:bg-[#203a64] transition duration-300 cursor-pointer shadow-xl "
                >
                    Post A Job Now
                </button>
                <button
                    className="py-3 px-10 text-lg font-semibold rounded-lg bg-white text-[#15294B] hover:bg-gray-100 transition duration-300 cursor-pointer shadow-xl border border-[#15294B] "
                >
                    Create Recruiter Profile
                </button>
            </div>
            
            {/* Statistics */}
            <div className='flex justify-center space-x-6 md:space-x-12 mt-12'>
                {stats.map((stat, index) => (
                    <div key={index} className='flex flex-col items-center text-white'>
                        {/* Icon Container with Teal Background */}
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 bg-[#1c787a]`}>
                            <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <span className='text-lg md:text-xl font-bold mt-1 text-white'>{stat.count}</span>
                        <span className='text-sm md:text-base text-gray-300 font-medium'>{stat.label}</span>
                    </div>
                ))}
            </div>

        </div>
            </div>
            

            <RecruitmentFeatures/>
            {/* <TopCompanies/> */}
            <Pattern/>
            <Testimonials/>
            <Trust/>
        </div>
        </>
    )
}

export default JRLandingPage