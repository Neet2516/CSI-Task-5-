// IndustryInsights.js
import React from 'react';
import IndustryCard from './IndustryCard'; // Assuming IndustryCard.js is in the same directory

const industryData = [
    {
        icon: '💻',
        title: 'Technology & IT',
        description: "India's tech sector is expanding fast. AI, Cloud, and Cybersecurity roles up by 40% this year.",
        topSkills: 'Python, Javascript, Data Analytics, Cloud Computing',
        salary: '₹4–10 LPA',
        topRoles: ['Full Stack Developer', 'Data Scientist', 'Cloud Solutions Architect', 'Cybersecurity Analyst', 'AI/ML Engineer']
    },
    {
        icon: '📈',
        title: 'Business, Finance & Marketing',
        description: 'Strong demand for Digital Marketers, Data Analysts, and Finance Associates.',
        topSkills: 'Excel, Google Analytics, SEO, Financial Modeling',
        salary: '₹3–8 LPA',
        topRoles: ['Digital Marketing Manager', 'Business Analyst', 'Financial Analyst', 'SEO/SEM Specialist', 'Content Strategist']
    },
    {
        icon: '⚙️',
        title: 'Engineering & Manufacturing',
        description: 'Opportunities rising in Automation, EVs, and Sustainable Manufacturing.',
        topSkills: 'CAD, PLC Programming, Quality Control, Robotics.',
        salary: '₹3–7 LPA',
        topRoles: ['Automation Engineer', 'Mechanical Design Engineer', 'Quality Assurance Manager', 'Supply Chain Analyst', 'IoT Engineer']
    },
    {
        icon: '🎨',
        title: 'Design & Creative Fields',
        description: 'Startups and agencies hiring UI/UX Designers, Graphic Artists, and Content Creators.',
        topSkills: 'Figma, Canva, Adobe Suite, User Research.',
        salary: '₹3–6 LPA',
        topRoles: ['Product Designer', 'UI/UX Designer', 'Social Media Manager', 'Video Editor / Animator', 'Brand Strategist']
    },
];

const IndustryInsights = () => {
    return (
        <div className="font-sans bg-white p-4 sm:p-8 lg:p-12">
            
            {/* Main Header */}
            <header className="max-w-4xl mx-auto mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                    Industry Insights
                </h1>
                <p className="text-lg text-gray-600">
                    Get real-time updates on growing industries, trending job roles, and the skills top employers want in 2025.
                </p>
            </header>

            {/* Cards Container */}
            <div className="flex flex-wrap -mx-3 max-w-7xl mx-auto">
                {industryData.map((data, index) => (
                    <IndustryCard 
                        key={index}
                        icon={data.icon}
                        title={data.title}
                        description={data.description}
                        topSkills={data.topSkills}
                        salary={data.salary}
                        topRoles={data.topRoles}
                    />
                ))}
            </div>
        </div>
    );
};

export default IndustryInsights;