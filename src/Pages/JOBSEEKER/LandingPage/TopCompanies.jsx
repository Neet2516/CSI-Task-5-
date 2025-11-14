import React from 'react';

// --- Inline SVG Logos ---

// Instagram Logo SVG (Simplified)
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

// McDonald's Logo SVG (Simplified Golden Arches)
const McDonaldsLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-600 p-2 border-2 border-yellow-400 rounded-2xl shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
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
        <section className="bg-[#f1f5fa] py-16 md:py-24 px-4 font-sans">
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

export default TopCompanies;