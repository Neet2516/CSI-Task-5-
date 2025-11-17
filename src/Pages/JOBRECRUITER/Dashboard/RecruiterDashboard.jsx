import React, { useState, useEffect } from "react";
import {
    BarChart,
    User,
    FileText,
    Briefcase, // Changed from Search to Briefcase for 'My Job Posts'
    LogOut,
    Menu,
    Eye, // For View action
    Edit, // For Edit action
    Trash2 // For Delete action
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { DiBlackberry } from "react-icons/di";

// --- Utility Components ---

// 1. Sidebar Link Component (Updated links for Recruiter)
const SidebarLink = ({ icon: Icon, text, active, isLogout = false, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center p-3 my-1 rounded-md cursor-pointer transition duration-150 ease-in-out
            ${active ? "bg-[#3b5998] text-white font-semibold" : "text-gray-200 hover:bg-[#2b3a62]"}
            ${isLogout ? "mt-8 text-red-400 hover:text-red-300" : ""}`}
    >
        <Icon className="w-5 h-5 mr-3" />
        <span>{text}</span>
    </div>
);

// 2. Summary Card Component (Updated for Recruiter Metrics)
const SummaryCard = ({ title, count, icon: Icon, iconBgColor,className }) => (
    <div className="p-6 rounded-xl shadow-lg bg-white h-36 flex flex-col justify-between items-start border border-gray-100">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className={`text-6xl font-extrabold mt-1  ${className}`}>{count}</h3>
    </div>
);

// --- Main Dashboard Component ---

export default function RecruiterDashboard() {

    
    const navigate = useNavigate();
    const location = useLocation();
    
    const [name, setName] = useState("");
        useEffect(() => {
            const accessData = JSON.parse(localStorage.getItem("accessData")) || {};
            setName(accessData.name || "");
        }, []);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Mock data for the job posts table
    const [jobPosts, setJobPosts] = useState([
        { id: 1, title: "Senior Frontend Developer", applicants: 15, datePosted: "Nov 05, 2025" },
        { id: 2, title: "UI/UX Designer", applicants: 45, datePosted: "Nov 05, 2025" },
        { id: 3, title: "MERN developer", applicants: 20, datePosted: "Nov 05, 2025" },
        { id: 4, title: "Senior Frontend Developer", applicants: 57, datePosted: "Nov 05, 2025" },
        { id: 5, title: "Full stack", applicants: 23, datePosted: "Nov 05, 2025" },
    ]);
    
    // Mock data for summary cards
    const totalJobsPosted = jobPosts.length;
    const totalApplicants = jobPosts.reduce((sum, post) => sum + post.applicants, 0);
    const pendingReviews = 9; // Placeholder value

    useEffect(() => {
        // Mock data initialization logic
        // In a real app, this is where you'd fetch user info from Firestore
    }, []);

    const handleLogout = () => {
        console.log("Logging out...");
        navigate("/auth/register");
    };
    
    const handleAction = (action, jobId) => {
        // Custom modal/popup logic would go here instead of alert()
        console.log(`${action} job ID: ${jobId}`);
        if (action === 'Delete') {
            setJobPosts(jobPosts.filter(job => job.id !== jobId));
        }
    }

    const navigationLinks = [
        { icon: BarChart, text: "Dashboard", path: "/recruiter/dashboard" },
        { icon: User, text: "My Profile", path: "/recruiter/profile" },
        { icon: FileText, text: "My Applicants", path: "/recruiter/applicants" },
        { icon: Briefcase, text: "My Job Posts", path: "/recruiter/job-posts" },
    ];


    return (
        <div className="relative flex h-screen bg-gray-50 font-sans">

            {/* Mobile Header (for toggling sidebar) */}
            <div className="absolute top-0 left-0 lg:hidden flex items-center justify-between w-full h-14 p-4 bg-white shadow-md z-40">
                <h1 className="text-xl font-bold text-gray-900">Recruiter</h1>
                <Menu
                    className="w-7 h-7 cursor-pointer text-gray-800"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
            </div>

            {/* Overlay for Mobile Menu */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed lg:static top-0 left-0 h-full w-64 bg-[#2f426a] text-white shadow-2xl p-4 flex flex-col
                    transform transition-transform duration-300
                    ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    z-50
                `}
            >
                {/* Title */}
                <h1 className="text-2xl font-bold mb-8">Recruiter {name}</h1>

                <nav className="grow">
                    {navigationLinks.map(link => (
                        <SidebarLink
                            key={link.text}
                            icon={link.icon}
                            text={link.text}
                            // Simplified active check for demo
                            active={link.path === "/recruiter/dashboard"} 
                            onClick={() => { navigate(link.path); setMobileMenuOpen(false); }}
                        />
                    ))}

                    <div className="mt-12">
                        <SidebarLink
                            icon={LogOut}
                            text="Logout"
                            isLogout
                            onClick={handleLogout}
                        />
                    </div>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="grow overflow-y-auto p-4 sm:p-8 pt-16 lg:pt-8">
                
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Recruiter {name}
                    </h1>
                    <p className="text-gray-600">
                        Here's a summary of your job recruitment activity.
                    </p>
                </header>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <SummaryCard 
                        title="Total Jobs Posted" 
                        count={totalJobsPosted} 
                        icon={Briefcase} 
                        iconBgColor="bg-blue-100"
                        className={"text-black"}
                    />
                    <SummaryCard 
                        title="Total Applicants" 
                        count={totalApplicants} 
                        icon={User} 
                        iconBgColor="bg-yellow-100"
                        className={"text-yellow-400"}
                    />
                    <SummaryCard 
                        title="Pending Reviews" 
                        count={pendingReviews} 
                        icon={FileText} 
                        iconBgColor="bg-red-100"
                        className={"text-blue-500"}
                    />
                </div>

                {/* My Job Posts Table */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                        My Job Posts
                    </h2>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <th className="py-3 pr-4">Job Title</th>
                                <th className="py-3 px-4 text-center">Applicants</th>
                                <th className="py-3 px-4">Date Posted</th>
                                <th className="py-3 pl-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {jobPosts.map(post => (
                                <tr key={post.id} className="text-sm text-gray-700 hover:bg-gray-50">
                                    <td className="py-3 pr-4 font-medium">{post.title}</td>
                                    <td className="py-3 px-4 text-center">{post.applicants}</td>
                                    <td className="py-3 px-4">{post.datePosted}</td>
                                    <td className="py-3 pl-4 text-center whitespace-nowrap space-x-3">
                                        <button 
                                            onClick={() => handleAction('View', post.id)} 
                                            className="text-blue-600 hover:text-blue-800 transition text-xs font-semibold"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => handleAction('Edit', post.id)} 
                                            className="text-green-600 hover:text-green-800 transition text-xs font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleAction('Delete', post.id)} 
                                            className="text-red-600 hover:text-red-800 transition text-xs font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </main>
        </div>
    );
}