import React, { useState, useCallback } from 'react';
// Using lucide-react for icons
import { UploadCloud, FileText, Image, Code, CheckCircle, XCircle } from 'lucide-react';

// --- Helper component for File Inputs ---
const FileInput = ({ id, label, icon: Icon, note, required = false, onChange, hasFile }) => (
  <div className="flex flex-col mb-6 bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-inner">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
      <Icon className="w-5 h-5 mr-2 text-indigo-500" />
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      <input
        type="file"
        id={id}
        name={id}
        onChange={onChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        accept={note.includes('PDF') ? ".pdf,.doc,.docx" : (note.includes('JPG') ? "image/*" : "*/*")}
      />
      {hasFile && <span className="absolute top-1 right-1 text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">File Selected</span>}
    </div>
    <p className="text-xs text-gray-500 mt-2">{note}</p>
  </div>
);

// --- Main Profile Page Component ---
const ProfilePage = () => {
  const ENDPOINT = 'https://job-portal-my15.onrender.com/api/job-seeker/profile';
  
  const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    languages: [],
    bio: '',
    skills: [],
    educations: [],
    experiences: [],
    privacyConsent: false,
    contactConsent: false,
  };

  const [formData, setFormData] = useState(initialData);
  const [fileData, setFileData] = useState({ resume: null, profileImage: null, additionalFile: null });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

  // Handle changes for text/select inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for checkboxes
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } 
    // Special handling for list fields (skills, education, experience, languages)
    else if (['skills', 'educations', 'experiences'].includes(name)) {
      // Convert comma-separated string to array of strings
      // Note: We use filter to ensure only non-empty strings are included in the array
      const arrayValue = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
      setFormData(prev => ({ ...prev, [name]: arrayValue }));
    }
    // Handle the single select language field (which is treated as a single value, but state is array)
    else if (name === 'languages') {
        const arrayValue = value ? [value] : [];
        setFormData(prev => ({ ...prev, [name]: arrayValue }));
    }
    // Standard text inputs
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileData(prev => ({ ...prev, [name]: files[0] || null }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("accessToken");

  // Build the data object EXACTLY as backend wants
  const payload = {
    firstName,
    lastName,
    email,
    phoneNumber,
    bio,
    languages,
    skills,
    educations,
    experiences,
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(payload)); // <-- REQUIRED

  if (resumeFile) formData.append("resume", resumeFile);
  if (profileImage) formData.append("profileImage", profileImage);
  if (additionalFile) formData.append("additionalFile", additionalFile);

  console.log("--- FormData Before API Call ---");
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const res = await fetch(
      "https://job-portal-my15.onrender.com/api/job-seeker/profile",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Don't set content-type for FormData
        },
        body: formData,
      }
    );

    const result = await res.json();
    console.log("Server Response:", result);

    if (!res.ok) {
      console.error("Error:", result.message);
      alert(result.message || "Something went wrong");
    } else {
      alert("Profile updated successfully!");
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};




  // Helper function to get value for list fields from state
  const getListValue = (key) => {
    // If the array is empty, return an empty string, otherwise join the elements.
    return Array.isArray(formData[key]) && formData[key].length > 0 ? formData[key].join(', ') : '';
  };
  
  // Helper to get selected language for the select element
  const getLanguageValue = () => {
      return formData.languages.length > 0 ? formData.languages[0] : '';
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 md:p-10">
        
        {/* Header and Image Upload Mock */}
        <div className="text-center mb-8">
            <UploadCloud className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">Job Seeker Profile</h1>
            <p className="text-sm text-gray-500 mt-2">
                Drag & Drop a profile image here, or click to upload. <br />
                Max photo size 5 MB.
            </p>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-3 mb-8">Personal Information</h2>

          {/* Personal Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              value={formData.lastName}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Contact and Language Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number*"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <select
              name="languages"
              onChange={(e) => handleChange(e)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={getLanguageValue()}
              required
            >
              <option value="">Choose Language*</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Bio*"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mb-6 resize-y"
            required
          />

          {/* File Uploads Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FileInput 
              id="resume" 
              label="Upload CV/Resume (Optional)" 
              icon={FileText} 
              note="Max 5MB. Accepts PDF, DOCX." 
              onChange={handleFileChange}
              required={false}
              hasFile={!!fileData.resume}
            />
            <FileInput 
              id="profileImage" 
              label="Upload Profile Image" 
              icon={Image} 
              note="Max 5MB. Accepts JPG, PNG." 
              onChange={handleFileChange}
              hasFile={!!fileData.profileImage}
            />
            <FileInput 
              id="additionalFile" 
              label="Add Script File" 
              icon={Code} 
              note="Optional file upload." 
              onChange={handleFileChange}
              hasFile={!!fileData.additionalFile}
            />
          </div>

          {/* Skills, Education, Experience (List Fields) */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Details</h2>
          
          <textarea
            name="skills"
            placeholder="Skills* (e.g., Spring Boot, React, Docker - Separate with commas)"
            value={getListValue('skills')}
            onChange={handleChange}
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mb-6 resize-y"
            required
          />

          <textarea
            name="educations"
            placeholder="Education* (e.g., B.Tech CSE, Harvard - Separate with commas)"
            value={getListValue('educations')}
            onChange={handleChange}
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mb-6 resize-y"
            required
          />

          <textarea
            name="experiences"
            placeholder="Job Experience* (e.g., 1 Year Internship at ABC - Separate with commas)"
            value={getListValue('experiences')}
            onChange={handleChange}
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mb-6 resize-y"
            required
          />

          {/* Consent Checkboxes */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                id="privacyConsent"
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                required
              />
              <label htmlFor="privacyConsent" className="ml-3 text-sm text-gray-600">
                By submitting this application, I agree that I have read the Privacy Policy and consent to that JobPortal processing my personal details to process my job application.
              </label>
            </div>
            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="contactConsent"
                name="contactConsent"
                checked={formData.contactConsent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="contactConsent" className="ml-3 text-sm text-gray-600">
                You may be contacted directly about specific future business opportunities.
              </label>
            </div>
          </div>

          {/* Status Message */}
          {status && (
            <div 
              className={`p-3 rounded-lg flex items-center mb-6 transition-opacity duration-300 ${
                status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
              role="alert"
            >
              {status.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3" /> : <XCircle className="w-5 h-5 mr-3" />}
              <span className="font-medium">{status.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;