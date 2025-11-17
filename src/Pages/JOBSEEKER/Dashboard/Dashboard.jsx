import React, { useState, useEffect } from "react";
import {
    BarChart,
    User,
    FileText,
    Bookmark,
    Search,
    LogOut,
    Menu
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Sidebar Link Component
const SidebarLink = ({ icon: Icon, text, active, isLogout = false, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center p-3 my-1 rounded-md cursor-pointer transition 
            ${active ? "bg-[#3b5998] text-white font-semibold" : "text-gray-200 hover:bg-[#2b3a62]"} 
            ${isLogout ? "mt-8 text-red-400 hover:text-red-300" : ""}`}
    >
        <Icon className="w-5 h-5 mr-3" />
        <span>{text}</span>
    </div>
);

// Summary Card Component
const SummaryCard = ({ title, count, bgColor, textColor }) => (
    <div className={`p-6 rounded-xl shadow-lg h-36 flex flex-col justify-between ${bgColor} ${textColor}`}>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-6xl font-extrabold">{count}</h3>
    </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
    const colors = {
        Accepted: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Rejected: "bg-red-100 text-red-700",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-700"}`}>
            {status}
        </span>
    );
};

export default function Dashboard() {

    const navigate = useNavigate();
    const location = useLocation();

    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [recentApplications, setRecentApplications] = useState([]);
    const [name, setName] = useState("");
    useEffect(() => {
        const accessData = JSON.parse(localStorage.getItem("accessData")) || {};
        setName(accessData.name || "");
    }, []);

    useEffect(() => {
        setRecentApplications([
            { id: 1, title: "Frontend Developer", company: "Tech Corp", date: "Nov 05, 2025", status: "Accepted" },
            { id: 2, title: "UI/UX Designer", company: "DesignHub", date: "Nov 05, 2025", status: "Pending" },
            { id: 3, title: "MERN Developer", company: "SoftX", date: "Nov 05, 2025", status: "Rejected" },
        ]);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">

            {/* MOBILE HEADER */}
            <div className=" relative top-0 lg:hidden flex items-center justify-between h-5 p-4  text-black">
                {/* <h1 className="text-xl font-bold">JobSeeker</h1> */}
                <Menu
                    className="w-7 h-7 cursor-pointer"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
            </div>

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed lg:static top-0 left-0 h-full w-64 bg-[#2f426a] text-white shadow-2xl p-4 flex flex-col
                    transform transition-transform duration-300
                    ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    z-50
                `}
            >
                <h1 className="text-2xl font-bold mb-8 hidden lg:block">JobSeeker</h1>

                <nav className="grow">

                    <SidebarLink
                        icon={BarChart}
                        text="Dashboard"
                        active={location.pathname === "/jobs/dashboard"}
                        onClick={() => { navigate("/jobs/dashboard"); setMobileMenuOpen(false); }}
                    />

                    <SidebarLink
                        icon={User}
                        text="My Profile"
                        active={location.pathname === "/jobs/profile"}
                        onClick={() => { navigate("/jobs/profile"); setMobileMenuOpen(false); }}
                    />

                    <SidebarLink
                        icon={FileText}
                        text="My Application"
                        active={location.pathname === "/jobs/applications"}
                        onClick={() => { navigate("/jobs/applications"); setMobileMenuOpen(false); }}
                    />

                    <SidebarLink
                        icon={Bookmark}
                        text="Saved Jobs"
                        active={location.pathname === "/jobs/saved-jobs"}
                        onClick={() => { navigate("/jobs/saved-jobs"); setMobileMenuOpen(false); }}
                    />

                    <SidebarLink
                        icon={Search}
                        text="Job Search"
                        active={location.pathname === "/jobs/jobs"}
                        onClick={() => { navigate("/jobs/jobs"); setMobileMenuOpen(false); }}
                    />

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
            <main className="w-full sm:w-auto grow overflow-y-auto p-8 mt-14 lg:mt-0">
                <h1 className="text-3xl font-bold">Welcome Back! {name} </h1>
                <p className="text-gray-600 mb-8">Here is your activity summary.</p>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <SummaryCard title="Total Applications" count="10" bgColor="bg-white" textColor="text-gray-900" />
                    <SummaryCard title="Pending" count="2" bgColor="bg-white" textColor="text-yellow-500" />
                    <SummaryCard title="Accepted" count="7" bgColor="bg-white" textColor="text-blue-600" />
                    <SummaryCard title="Rejected" count="5" bgColor="bg-white" textColor="text-red-500" />
                </div>

                {/* Recent Applications Table */}
                <div className="bg-white p-6 rounded-xl shadow-lg border overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4">My Recent Applications</h2>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="text-left text-xs font-medium text-gray-500">
                                <th className="py-3">Position</th>
                                <th className="py-3">Company</th>
                                <th className="py-3">Date</th>
                                <th className="py-3 text-right">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {recentApplications.map(app => (
                                <tr key={app.id} className="hover:bg-gray-50">
                                    <td className="py-3 font-medium">{app.title}</td>
                                    <td>{app.company}</td>
                                    <td>{app.date}</td>
                                    <td className="text-right">
                                        <StatusBadge status={app.status} />
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
