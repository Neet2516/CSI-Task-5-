import React, { useState, useCallback, useMemo } from 'react'

const PRIMARY_COLOR = '#15294B'; // Dark blue from the image
const MAX_SALARY = 10000;

const MOCK_DATA = {
    categories: [
        { name: 'Commerce', count: 10 },
        { name: 'Telecommunications', count: 10 },
        { name: 'Hotels & Tourism', count: 10 },
        { name: 'Education', count: 10 },
        { name: 'Financial Services', count: 10 },
        { name: 'Technology', count: 15 },
        { name: 'Healthcare', count: 8 },
    ],
    jobTypes: [
        { name: 'Full Time', count: 10 },
        { name: 'Part Time', count: 10 },
        { name: 'Freelance', count: 10 },
        { name: 'Seasonal', count: 10 },
        { name: 'Fixed-Price', count: 10 },
    ],
    experienceLevels: [
        { name: 'No-experience', count: 10 },
        { name: 'Fresher', count: 10 },
        { name: 'Intermediate', count: 10 },
        { name: 'Expert', count: 10 },
    ],
    datePosted: [
        { name: 'All', value: 'all', count: 10 },
        { name: 'Last Hour', value: 'hour', count: 10 },
        { name: 'Last 24 Hours', value: '24h', count: 10 },
        { name: 'Last 7 Days', value: '7d', count: 10 },
        { name: 'Last 30 Days', value: '30d', count: 10 },
    ],
    tags: ['engineering', 'design', 'ui/ux', 'marketing', 'management', 'soft', 'construction'],
};

// --- REUSABLE SUB-COMPONENTS ---

// Checkbox input group
const FilterCheckboxGroup = ({ title, items, selectedItems, onToggle, maxVisible = 5, isSingleSelect = false }) => {
    const [showMore, setShowMore] = useState(false);

    const visibleItems = useMemo(() => {
        return (showMore || items.length <= maxVisible) ? items : items.slice(0, maxVisible);
    }, [items, showMore, maxVisible]);

    const handleToggle = useCallback((name) => {
        onToggle(name, isSingleSelect);
    }, [onToggle, isSingleSelect]);

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <div className="space-y-2">
                {visibleItems.map((item, index) => (
                    <label key={index} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.name)}
                                onChange={() => handleToggle(item.name)}
                                className={`h-4 w-4 rounded-sm text-[${PRIMARY_COLOR}] focus:ring-[${PRIMARY_COLOR}] transition duration-150 border-gray-300`}
                                style={{ accentColor: PRIMARY_COLOR }}
                            />
                            <span className="ml-3 text-sm text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{item.count}</span>
                    </label>
                ))}
            </div>
            {items.length > maxVisible && !isSingleSelect && (
                <button
                    onClick={() => setShowMore(prev => !prev)}
                    className={`mt-2 text-sm font-semibold transition duration-150 ${showMore ? 'text-gray-500' : 'text-blue-600 hover:text-blue-700'}`}
                >
                    {showMore ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

// --- MAIN COMPONENT ---

const SearchFilter = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    
    // State for Checkbox Groups
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([]);
    
    // State for Single-select Group (Date Posted)
    const [selectedDatePosted, setSelectedDatePosted] = useState('all'); 
    
    // State for Salary Slider
    const [salaryMin, setSalaryMin] = useState(0);
    const [salaryMax, setSalaryMax] = useState(MAX_SALARY);

    // General handler for all multi-select checkbox groups
    const handleToggleSelection = useCallback((name, isSingleSelect = false) => {
        const updateState = (prev) => {
            if (isSingleSelect) {
                // If single-select, set the state directly
                return name; 
            }
            // Multi-select logic
            if (prev.includes(name)) {
                return prev.filter(item => item !== name);
            } else {
                return [...prev, name];
            }
        };

        // Determine which state setter to use
        if (MOCK_DATA.categories.some(c => c.name === name)) {
            setSelectedCategories(updateState);
        } else if (MOCK_DATA.jobTypes.some(j => j.name === name)) {
            setSelectedJobTypes(updateState);
        } else if (MOCK_DATA.experienceLevels.some(e => e.name === name)) {
            setSelectedExperience(updateState);
        } else if (MOCK_DATA.datePosted.some(d => d.name === name)) {
             // Date Posted uses the value ('all', 'hour', etc.) for selection, but the component uses the name.
             // Since it's single select, we set the state directly to the name (e.g., 'All')
             setSelectedDatePosted(name);
        }
    }, []);

    // Salary Slider Handlers
    const handleSalaryChange = (e) => {
        console.log(e)
        const value = parseInt(e.target.value, 10);
        if (e.target.id === 'min-salary') {
            setSalaryMin(Math.min(value, salaryMax));
        } else if (e.target.id === 'max-salary') {
            setSalaryMax(Math.max(value, salaryMin));
        }
    };

    const formatCurrency = (amount) => {
        if (amount >= MAX_SALARY) return `$${MAX_SALARY}+`;
        return `$${amount.toLocaleString()}`;
    };
    
    const salaryRangeDisplay = `Salary: ${formatCurrency(salaryMin)} – ${formatCurrency(salaryMax)}`;

    const handleApplyFilters = () => {
        console.log("Applying Filters:", {
            searchTitle,
            selectedLocation,
            selectedCategories,
            selectedJobTypes,
            selectedExperience,
            selectedDatePosted,
            salaryRange: [salaryMin, salaryMax],
        });
        // In a real application, this would trigger a data fetch or update URL parameters.
    };

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }} className="w-full max-w-sm p-6 bg-white rounded-xl shadow-2xl border border-gray-100 mx-auto">
            <div className="space-y-8">
                
                {/* 1. Search by Job Title */}
                <div className="space-y-3">
                    <h2 className="text-xl font-extrabold text-gray-900">Search by Job Title</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Job title or company"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 shadow-sm text-sm"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* 2. Location */}
                <div className="space-y-3">
                    <h2 className="text-xl font-extrabold text-gray-900">Location</h2>
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="appearance-none w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 shadow-sm text-sm cursor-pointer bg-white"
                        >
                            <option value="" disabled>Choose city</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* --- SECTIONS WITH CHECKBOX GROUPS --- */}
                
                {/* 3. Category */}
                <div className="border-t border-gray-200 pt-6">
                    <FilterCheckboxGroup
                        title="Category"
                        items={MOCK_DATA.categories}
                        selectedItems={selectedCategories}
                        onToggle={(name) => handleToggleSelection(name, false)}
                        maxVisible={5}
                    />
                    <button 
                        onClick={() => console.log('Show More Categories logic (implemented within component)')}
                        className={`mt-4 w-full py-2 rounded-xl text-white font-semibold transition duration-200 hover:bg-opacity-90`}
                        style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                        Show More
                    </button>
                </div>

                {/* 4. Job Type */}
                <div className="border-t border-gray-200 pt-6">
                    <FilterCheckboxGroup
                        title="Job Type"
                        items={MOCK_DATA.jobTypes}
                        selectedItems={selectedJobTypes}
                        onToggle={(name) => handleToggleSelection(name, false)}
                        maxVisible={5}
                    />
                </div>

                {/* 5. Experience Level */}
                <div className="border-t border-gray-200 pt-6">
                    <FilterCheckboxGroup
                        title="Experience Level"
                        items={MOCK_DATA.experienceLevels}
                        selectedItems={selectedExperience}
                        onToggle={(name) => handleToggleSelection(name, false)}
                        maxVisible={5}
                    />
                </div>
                
                {/* 6. Date Posted (Single Select Logic Implemented via onToggle) */}
                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Date Posted</h3>
                    <div className="space-y-2">
                        {MOCK_DATA.datePosted.map((item, index) => (
                            <label key={index} className="flex items-center justify-between cursor-pointer">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedDatePosted === item.name}
                                        onChange={() => handleToggleSelection(item.name, true)} // Pass true for single select
                                        className={`h-4 w-4 rounded-sm text-[${PRIMARY_COLOR}] focus:ring-[${PRIMARY_COLOR}] transition duration-150 border-gray-300`}
                                        style={{ accentColor: PRIMARY_COLOR }}
                                    />
                                    <span className="ml-3 text-sm text-gray-700">{item.name}</span>
                                </div>
                                <span className="text-xs text-gray-500">{item.count}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 7. Salary Range Slider */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                    <h2 className="text-xl font-extrabold text-gray-900">Salary</h2>

                    {/* Range Inputs (Hidden, but used for logic) */}
                    <div className="relative h-2">
                        <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                        <div
                            className="absolute h-2 rounded-full"
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                left: `${(salaryMin / MAX_SALARY) * 100}%`,
                                width: `${((salaryMax - salaryMin) / MAX_SALARY) * 100}%`,
                            }}
                        ></div>
                        
                        {/* Custom Styled Slider Thumbs */}
                        <input
                            id="min-salary"
                            type="range"
                            min="0"
                            max={MAX_SALARY}
                            step="1000"
                            value={salaryMin}
                            onChange={handleSalaryChange}
                            className="absolute w-full appearance-none bg-transparent "
                            style={{ top: '0', height: '0', padding: '0' }}
                        />
                        <input
                            id="max-salary"
                            type="range"
                            min="0"
                            max={MAX_SALARY}
                            step="1000"
                            value={salaryMax}
                            onChange={handleSalaryChange}
                            className="absolute w-full appearance-none bg-transparent "
                            style={{ top: '0', height: '0', padding: '0' }}
                        />
                    </div>
                    
                    {/* Salary Display and Apply Button */}
                    <div className="flex justify-between items-center pt-3">
                        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                            {salaryRangeDisplay}
                        </span>
                        <button
                            onClick={handleApplyFilters}
                            className={`py-2 px-6 rounded-xl text-white font-semibold transition duration-200 hover:opacity-90 shadow-md`}
                            style={{ backgroundColor: PRIMARY_COLOR }}
                        >
                            Apply
                        </button>
                    </div>
                </div>

                {/* 8. Tags */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                    <h2 className="text-xl font-extrabold text-gray-900">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {MOCK_DATA.tags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => console.log(`Tag clicked: ${tag}`)}
                                className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-150 shadow-sm border border-gray-200"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchFilter