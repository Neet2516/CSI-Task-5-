// IndustryCard.js
import React from 'react';

const IndustryCard = ({ icon, title, description, topSkills, salary, topRoles }) => {
    return (
        <div className="w-full lg:w-1/4 px-3 mb-6">
            <div className="bg-white p-6 h-full border border-gray-200 rounded-lg shadow-sm transition duration-300 hover:shadow-lg">
                
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3" role="img" aria-label={title}>{icon}</span>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 h-24 overflow-hidden">
                    {description}
                </p>

                {/* --- Section Separator --- */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Top Skills */}
                <div className="mb-4">
                    <h4 className="text-base font-semibold text-gray-800 mb-2">Top Skills:</h4>
                    <p className="text-sm text-gray-600 leading-snug">{topSkills}</p>
                </div>

                {/* Freshers Avg. Salary */}
                <div className="mb-4">
                    <h4 className="text-base font-semibold text-gray-800 mb-2">Freshers Avg. Salary:</h4>
                    <p className="text-sm text-gray-600 font-bold">{salary}</p>
                </div>

                {/* Top Job Roles */}
                <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-2">Top Job Roles:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {topRoles.map((role, index) => (
                            <li key={index} className="pl-1 leading-snug">{role}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IndustryCard;