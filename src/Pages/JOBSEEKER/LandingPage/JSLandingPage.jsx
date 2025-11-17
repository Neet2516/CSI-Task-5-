import React ,{useRef} from 'react'

import landingimg from '../../../assets/JOBSEEKER/landingimg.png'
import Pattern from './Pattern';
import Trust from './Trust';
import Testimonials from './Testimonials';
import { motion, useInView } from "framer-motion";
import { useNavigate } from 'react-router';
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

// Top Companies Section Component
const TopCompanies = () => {
    // Data for the company cards
    const companies = [
        {
            logo: InstagramLogo,
            name: "Instagram",
            description: "Join the creative force behind the world's most loved social media platform. Work with passionate teams shaping the future of digital storytelling.",
            openJobs: 8
        },
        {
            logo: TeslaLogo,
            name: "Tesla",
            description: "Be a part of the revolution in sustainable technology. Tesla offers challenging roles for those driven to make a global impact through innovation and clean energy.",
            openJobs: 18
        },
        {
            logo: McDonaldsLogo,
            name: "McDonald's",
            description: "Step into a fast-paced environment where teamwork and customer satisfaction define success. Build a rewarding career with one of the most recognized brands worldwide.",
            openJobs: 12
        },
        {
            logo: AppleLogo,
            name: "Apple",
            description: "Innovate with purpose at Apple — where creativity meets cutting-edge technology. Help design the future by contributing to products that inspire millions.",
            openJobs: 9
        },
    ];

    return (
        <section className="bg-gray-50 py-16 md:py-24 px-4 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Header and Subtitle */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Top Companies
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover some of the world's most innovative and leading companies offering exciting career opportunities and growth.
                    </p>
                </div>

                {/* Company Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {companies.map((company) => (
                        <CompanyCard
                            key={company.name}
                            logo={company.logo}
                            name={company.name}
                            description={company.description}
                            openJobs={company.openJobs}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

// =================================================================
// MAIN LANDING PAGE COMPONENT
// =================================================================

const JSLandingPage = () => {
    // Data for the statistics section
    const stats = [
        { count: '25,850', label: 'Jobs', icon: BriefcaseIcon },
        { count: '10,250', label: 'Candidates', icon: UsersIcon },
        { count: '18,400', label: 'Companies', icon: BuildingIcon },
    ];

    // Placeholder data for the select inputs
    const locations = ['New York', 'London', 'Remote', 'Bangalore'];
    const categories = ['Technology', 'Marketing', 'Finance', 'Healthcare'];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });
    const navigate=useNavigate();
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
                <div className='absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10'>
                    
                    {/* Title and Subtitle */}
                    <div className='text-[1.5rem] sm:text-4xl md:text-6xl font-serif font-extrabold text-white mb-4 drop-shadow-lg'>
                        Find Your Dream Job Today!
                    </div>
                    <p className='text-lg md:text-xl text-gray-200 mb-12 drop-shadow-md max-w-2xl'>
                        Connecting Talent with Opportunity: Your Gateway to Career Success
                    </p>

                    {/* Search Bar */}
                    <div className='bg-white   rounded-xl shadow-2xl w-full max-w-5xl mx-auto'>
                        <form className='flex flex-col lg:flex-row  items-center'>
                            
                            {/* Input: Job Title or Company */}
                            <input
                                type="text"
                                placeholder="Job Title or Company"
                                className="flex-1 w-full lg:w-auto p-5  border-r border-gray-200 focus:ring-[#15294B] focus:border-[#15294B] outline-none transition"
                            />

                            {/* Select: Location */}
                            <select className="w-full lg:w-auto p-5  border-r border-gray-200 bg-white focus:ring-[#15294B] focus:border-[#15294B] outline-none transition">
                                <option value="">Select Location</option>
                                {/* Added default option */}
                                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>

                            {/* Select: Category */}
                            <select className="w-full lg:w-auto p-5  border-r border-gray-200 bg-white focus:ring-[#15294B] focus:border-[#15294B] outline-none transition">
                                <option value="">Select Category</option>
                                {/* Added default option */}
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>

                            <button
                                type="submit"
                                className="w-full h-full p-5 lg:w-auto flex items-center justify-center space-x-2 px-6  bg-[#ebedf0] text-white font-semibold  hover:bg-blue-800 transition duration-300 shadow-md pl-8"
                                onClick={()=>{
                                    navigate("/jobs/jobs")
                                }}
                            >
                                <SearchIcon className="w-5 h-5" />
                                <span className='text-nowrap text-black'>Search Job</span>
                            </button>
                        </form>
                    </div>
                    
                    {/* Statistics */}
                    <div className='mt-12 md:mt-16 flex justify-center space-x-4 md:space-x-12'>
                        {stats.map((stat) => (
                            <div key={stat.label} className='flex flex-col items-center text-white'>
                                <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-white mb-2" />
                                <span className='text-2xl md:text-3xl font-bold'>{stat.count}</span>
                                <span className='text-sm md:text-base text-gray-300'>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            
            {/* Top Companies Section */}

            <motion.div >
                        <TopCompanies />
            </motion.div>
            {/* <TopCompanies/> */}
            <Pattern/>
            <Testimonials/>
            <Trust/>
        </div>
        </>
    )
}

export default JSLandingPage