import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CandidateLogosImage from '../assets/ChooseRole/Candidate.png';
import EmployerInterviewImage from '../assets/ChooseRole/Employer.png';

const BASE_API_URL = 'https://job-portal-my15.onrender.com';

const ChooseRole = () => {

  // Get user email from localStorage
  const storedUser = JSON.parse(localStorage.getItem("USERDETAILS"));
  const email = storedUser?.email; 

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleSelection = async (selectedRole) => {
    if (!email) {
      setError("Email is missing. Please sign up again.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const roleMap = {
      candidate: "JOBSEEKER",
      employer: "JOBGIVER"
    };

    const apiRole = roleMap[selectedRole];

    try {
  const response = await fetch(`${BASE_API_URL}/api/auth/assign-role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      role: apiRole,
    }),
  });

  const data = await response.text();   // IMPORTANT FIX !!!

  console.log("Response:", response);
  console.log("Data:", data);

  if (response.ok) {
    if (selectedRole === "candidate") {
      navigate("/jobs");
    } else {
      navigate("/employer-dashboard");
    }
  }
  else if (response.status === 403 && data.includes("User not verified yet")) {
    alert("Verification Required: Your account is not verified yet. Please check your email.");
    navigate("/verify-account");
  }
  else {
    setError(data || `Failed to assign role. Status: ${response.status}`);
  }

} catch (err) {
  console.error("API Call Error:", err);
  setError("A network error occurred. Please try again.");
} finally {
  setIsSubmitting(false);
}

  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">

        {/* Error Display */}
        {error && (
          <div className="md:col-span-2 text-center py-3 px-4 bg-red-100 text-red-700 rounded-md">
            ⚠️ Error: {error}
          </div>
        )}

        {/* Candidate Illustration */}
        <div className="flex items-center justify-center">
          <img 
            src={CandidateLogosImage}
            alt="Candidate Illustration"
            className="max-w-xs w-full h-auto"
          />
        </div>

        {/* Candidate Card */}
        <div className="bg-[#f1f5fa] p-12 rounded-xl shadow-lg flex flex-col items-center justify-center h-full">
          <div className="text-center max-w-sm">
            <h2 className="text-2xl font-serif font-medium text-gray-800 mb-2">
              Become a Candidate
            </h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Connect with recruiters and take the next step in your career.
            </p>
            <button
              onClick={() => handleRoleSelection("candidate")}
              disabled={isSubmitting}
              className={`py-3 px-12 font-semibold transition duration-300 shadow-md ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#15294b] text-white hover:bg-[#1f305c]"
              }`}
            >
              {isSubmitting ? "Processing..." : "Apply Now"}
            </button>
          </div>
        </div>

        {/* Employer Card */}
        <div className="bg-[#f1f5fa] p-12 rounded-xl shadow-lg flex flex-col items-center justify-center h-full">
          <div className="text-center max-w-sm">
            <h2 className="text-2xl font-serif font-medium text-gray-800 mb-2">
              Become an Employer
            </h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Hire the best talent for your team. Post jobs, manage applications, and grow your company effortlessly.
            </p>
            <button
              onClick={() => handleRoleSelection("employer")}
              disabled={isSubmitting}
              className={`py-3 px-12 font-semibold transition duration-300 shadow-md ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#25396D] text-white hover:bg-[#1f305c]"
              }`}
            >
              {isSubmitting ? "Processing..." : "Start Hiring"}
            </button>
          </div>
        </div>

        {/* Employer Illustration */}
        <div className="flex items-center justify-center">
          <img 
            src={EmployerInterviewImage}
            alt="Employer Illustration"
            className="max-w-sm w-full h-auto"
          />
        </div>

      </div>
    </div>
  );
};

export default ChooseRole;
