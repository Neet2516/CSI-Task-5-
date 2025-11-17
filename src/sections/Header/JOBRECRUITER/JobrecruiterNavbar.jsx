import React, { useState, useRef ,useEffect} from 'react';
import logo from '../../../assets/logo.png';
import { Link, useNavigate } from 'react-router';
import SNav from '../Header'
const useAuth = () => ({
    user: { id: 'user-001' },
    profilePicUrl: "https://placehold.co/40x40/15294B/ffffff?text=8"
});


const HomeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const ChatIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);



const BellIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.375 22a2 2 0 0 0 3.25 0"></path>
    </svg>
);

const SearchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
    </svg>
);
const ProfileIcon=()=>(
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="gray" strokeWidth="2" className="p-1">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
    
);

const MicIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
    </svg>
);

/* --------------------- NAV ITEM COMPONENT --------------------- */

const NavItem = ({ icon: Icon, label, path, active, onClick }) => (
    <button
        onClick={() => onClick(path)}
        className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-xl shadow-md min-w-[100px] transition
            ${active ? 'bg-[#15294B] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}
        `}
    >
        <Icon className={`${active ? 'text-white' : 'text-[#15294B]'}`} />
        <span className="font-semibold text-sm">{label}</span>
    </button>
);

/* --------------------- MAIN NAVBAR --------------------- */

const JobrecruiterNavbar = () => {
    const navigate = useNavigate();
    const { user, profilePicUrl } = useAuth();

    const [activePath, setActivePath] = useState('/jobs');
    const [text, setText] = useState('');

    /* --------------------- VOICE RECOGNITION --------------------- */

    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && !recognitionRef.current) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.lang = "en-US"; // change to "hi-IN" for Hindi
        recognitionRef.current = recog;

        recog.onresult = (event) => {
            const idx = event.resultIndex;
            const transcript = event.results[idx][0].transcript;
            setText(prev => prev + " " + transcript);
        };
    }

    const handleMicClick = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported!");
            return;
        }

        if (listening) {
            recognitionRef.current.stop();
            setListening(false);
        } else {
            recognitionRef.current.start();
            setListening(true);
        }
    };

    /* --------------------- NAVIGATION --------------------- */

    const handleNavigation = (path) => {
        setActivePath(path);
        navigate(path);
    };

    const navItems = [
        { label: 'Home', path: '/recruiter/home', icon: HomeIcon },
        { label: 'Chats', path: '/recruiter/chats', icon: ChatIcon },
    ];
    const bottomnavItems = [
        { label: 'Home', path: '/jobs/home', icon: HomeIcon },
        { label: 'Chats', path: '/jobs/chats', icon: ChatIcon },
        { label: 'Profile', path: '/jobs/dashboard', icon: ProfileIcon },
    ];
    
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("🇮🇳 India");
    const dropdownRef = useRef(null);
    const options = ["🇮🇳 India", "🇺🇸 USA", "🇬🇧 UK"];

     useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

     const selectCountry = (country) => {
    setSelected(country);
    setOpen(false);
    };

    /* --------------------- UI + LAYOUT (UNCHANGED) --------------------- */

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }}>
            <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
                <div className="w-full px-5 py-3">
                    <div className=" hidden sm:flex w-full justify-between items-center h-16">

                        {/* LOGO */}
                        <button onClick={() => navigate("/recruiter")}>
                            <div className="flex items-center space-x-2 mr-6">
                                <img src={logo} className="h-10" alt="Logo" />
                                <span className="text-2xl font-extrabold text-[#15294B]">
                                    NextStep
                                </span>
                            </div>
                        </button>

                        {/* SEARCH BAR */}
                        <div className="flex-1 max-w-lg mx-4">
                            <div className="relative flex items-center bg-gray-100 rounded-xl p-2 shadow-inner border border-gray-200">

                                <SearchIcon className="text-gray-500 ml-2" />

                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full bg-transparent px-3 text-gray-800 placeholder-gray-500 focus:outline-none"
                                />

                                {/* MIC BUTTON */}
                                <button
                                    className={`p-1 rounded-full transition ${listening ? 'text-red-600' : 'text-gray-500'} hover:text-[#15294B]`}
                                    onClick={handleMicClick}
                                >
                                    <MicIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT ICONS */}
                        <div className="flex items-center space-x-4">

                            {/* DESKTOP NAV BUTTONS */}
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

                            {/* NOTIFICATION */}
                            <Link to ="/recruiter/submit"  >
                            <div className="p-3 relative rounded-xl border bg-white shadow-md hover:bg-gray-50 cursor-pointer">
                                <BellIcon className="text-gray-700" />
                                <span className="absolute top-0 right-0 px-1.5 py-0.5 text-xs text-white bg-red-600 rounded-full">
                                        1
                                </span>
                            </div>
                            </Link>

                            {/* COUNTRY */}
                             <div ref={dropdownRef} className="relative inline-block">
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="p-3 rounded-xl border bg-white shadow-md flex items-center space-x-2 cursor-pointer"
      >
        <span className="text-xl">{selected.split(" ")[0]}</span>
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="gray"
          strokeWidth="2"
          className={`transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <polyline points="4 6 8 10 12 6"></polyline>
        </svg>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded-xl shadow-lg py-2 z-10">
          {options.map((country) => (
            <div
              key={country}
              onClick={() => selectCountry(country)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {country}
            </div>
          ))}
        </div>
      )}
    </div>

                            {/* PROFILE ICON */}
                            <button className="w-10 h-10 rounded-xl bg-[#15294B] overflow-hidden shadow-lg border-2 border-[#15294B]" onClick={()=>{
                                navigate("/jobs/dashboard")
                            }}>
                                <svg width="40" height="40" fill="none" stroke="white" strokeWidth="2" className="p-1">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <SNav className= "block h-16 sm:hidden"/>
                    

                    {/* MOBILE NAV */}
                    <nav className="fixed inset-x-0 bottom-0 bg-white shadow-2xl p-2 flex justify-around border-t border-gray-200 lg:hidden">
                        {bottomnavItems.map(item => (
                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`flex flex-col items-center p-2 rounded-lg transition ${activePath === item.path ? 'text-[#15294B]' : 'text-gray-500'}`}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="text-xs mt-1">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                </div>
            </header>
        </div>
    );
};

export default JobrecruiterNavbar;
