import React, { useState } from 'react';
import logo from '../../../assets/logo.png'
// Mock assets and hooks are kept for context
const useNavigate = () => (path) => console.log(`Navigating to: ${path}`);
const useAuth = () => ({
    user: { id: 'user-001' },
    profilePicUrl: "https://placehold.co/40x40/15294B/ffffff?text=8" 
});

// --- Icon Components (using Lucide-react equivalent SVGs) ---

const HomeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const ChatIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const BriefcaseIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const BellIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.375 22a2 2 0 0 0 3.25 0"></path>
    </svg>
);

const SearchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
    </svg>
);

const MicIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" x2="12" y1="19" y2="22"></line>
    </svg>
);

const NavItem = ({ icon: Icon, label, path, active, onClick }) => (
    <button
        onClick={() => onClick(path)}
        className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-xl transition duration-200 shadow-md min-w-[100px]
            ${active 
                ? 'bg-[#15294B] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }
        `}
    >
        <Icon className={`${active ? 'text-white' : 'text-[#15294B]'}`} />
        <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-800'}`}>{label}</span>
    </button>
);


const JobseekerNavbar = () => {
    const navigate = useNavigate();
    const { user, profilePicUrl } = useAuth();
    // Path updated to /jobs/home
    const [activePath, setActivePath] = useState('/jobs/home');
    const [searchQuery, setSearchQuery] = useState('');

    const handleNavigation = (path) => {
        setActivePath(path);
        navigate(path);
    };

    const navItems = [
        { label: 'Home', path: '/jobs/home', icon: HomeIcon, iconColor: 'text-[#15294B]' },
        { label: 'Chats', path: 'jobs/chats', icon: ChatIcon, iconColor: 'text-red-600' }, // Assuming chat icon is often red/orange
        { label: 'Jobs', path: '/jobs', icon: BriefcaseIcon, iconColor: 'text-gray-700' },
    ];

    return (
        // The div below represents the main container, mimicking the behavior of a static asset
        <div style={{ fontFamily: 'Inter, sans-serif' }}> 
            <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* 1. Logo */}
                        <div className="flex items-center space-x-2 mr-6">
                            <img src={logo} className='h-10'alt="" />
                            
                            <span className="text-2xl font-extrabold text-[#15294B] leading-none tracking-tight flex items-center">
                                NextStep
                            </span>
                        </div>

                        {/* 2. Search Bar (Visible on all sizes, responsive width) */}
                        <div className="flex-1 max-w-lg mx-4">
                            <div className="relative flex items-center bg-gray-100 rounded-xl p-2 shadow-inner border border-gray-200">
                                <SearchIcon className="text-gray-500 ml-2" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent p-1 px-3 text-gray-800 placeholder-gray-500 focus:outline-none"
                                />
                                <button 
                                    className="p-1 rounded-full text-gray-500 hover:text-[#15294B] transition"
                                    aria-label="Voice Search"
                                    onClick={() => console.log('Initiate Voice Search')}
                                >
                                    <MicIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* 3. Navigation Links and Actions (Responsive - centers items) */}
                        <div className="flex items-center space-x-4">
                            
                            {/* Desktop Navigation Items */}
                            <nav className="hidden lg:flex items-center space-x-4">
                                {navItems.map(item => (
                                    <NavItem 
                                        key={item.path}
                                        {...item}
                                        active={activePath === item.path}
                                        onClick={handleNavigation}
                                    />
                                ))}
                            </nav>

                            {/* Notification Bell */}
                            <div className="p-3 relative rounded-xl border border-gray-300 bg-white shadow-md hover:bg-gray-50 transition duration-150 cursor-pointer">
                                <BellIcon className="text-gray-700" />
                                <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                    1 
                                </span>
                            </div>

                            {/* Language/Region Selector */}
                            <div className="relative group p-3 rounded-xl border border-gray-300 bg-white shadow-md cursor-pointer flex items-center space-x-2 hover:bg-gray-50 transition duration-150">
                                <span role="img" aria-label="Indian Flag" className="text-xl">🇮🇳</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>

                            {/* User Profile */}
                            <button className="shrink-0 w-10 h-10 rounded-xl bg-[#15294B] overflow-hidden shadow-lg border-2 border-[#15294B] hover:border-blue-300 transition duration-150" aria-label="User Profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white p-1">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </button>

                        </div>
                    </div>
                    
                    {/* Mobile Navigation (Bottom Bar) */}
                    <nav className="fixed inset-x-0 bottom-0 bg-white shadow-2xl p-2 flex justify-around border-t border-gray-200 lg:hidden">
                        {navItems.map(item => (
                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`flex flex-col items-center p-2 rounded-lg transition duration-200 ${activePath === item.path ? 'text-[#15294B]' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="text-xs font-medium mt-1">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default JobseekerNavbar;