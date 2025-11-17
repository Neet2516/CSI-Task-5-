import React, { useState } from "react";

import { Upload, FileImage, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecruiterProfile = () => {
  const navigate = useNavigate();

  const ENDPOINT = "https://job-portal-my15.onrender.com/api/giver/profile";

  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    companyName: "",
    location: "",
    contact: "",
    bio: "",
    linkedinProfileUrl: "",
    specializations: [],
    companyDescription: "",
  });

  const [companyLogo, setCompanyLogo] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // ------------------ INPUT CHANGE ------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "specializations") {
      const arr = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v);
      setFormData((prev) => ({ ...prev, specializations: arr }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ------------------ FILE CHANGE ------------------
  const handleFileChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  // ------------------ SUBMIT FORM ------------------
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // 1️⃣ Correct payload using YOUR state formData
  const payload = {
    fullName: formData.fullName,
    jobTitle: formData.jobTitle,
    companyName: formData.companyName,
    location: formData.location,
    contact: formData.contact,
    bio: formData.bio,
    linkedinProfileUrl: formData.linkedinProfileUrl,
    specializations: formData.specializations,
    companyDescription: formData.companyDescription,
  };

  const fd = new FormData();
  fd.append("data", JSON.stringify(payload));

  if (companyLogo instanceof File) {
    fd.append("companyLogo", companyLogo);
  }

  try {
    const response = await axios.post(
      ENDPOINT,
      fd,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // DO NOT SET Content-Type manually
        },
      }
    );

    setStatus({ type: "success", message: "Profile updated successfully!" });

  } 
  catch (error) {
    console.log("🔥 FULL ERROR:", error);

    if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("RESPONSE:", error.response.data);
    } else {
        console.log("❌ NO RESPONSE FROM SERVER");
        console.log("ERROR MESSAGE:", error.message);
    }
}

  finally {
    setLoading(false);
  }
};






  const getSpecValue = () =>
    formData.specializations.length ? formData.specializations.join(", ") : "";

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 sm:p-10">

        {/* Top Upload Box */}
        <div className="w-full flex justify-center mb-10">
          <label className="w-64 h-40 bg-[#F3F8FF] border-2 border-dashed border-[#A7C1FF] rounded-xl flex flex-col items-center justify-center cursor-pointer">
            <Upload className="w-10 h-10 text-[#3B82F6]" />
            <p className="text-sm text-gray-500 mt-2 px-4 text-center">
              Upload recruiter image (only JPG/PNG).
            </p>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recruiter Bio
        </h2>

        <form onSubmit={handleSubmit}>
          {/* NAME + JOB TITLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium">Full Name*</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg"
                placeholder="Rohit Sharma"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Job Title*</label>
              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg"
                placeholder="HR Manager"
                required
              />
            </div>
          </div>

          {/* Company + Location + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium">Company Name*</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg"
                placeholder="TechVision Pvt Ltd"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Location*</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg"
                placeholder="Mumbai, India"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Contact Email*</label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg"
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div className="mb-6">
            <label className="text-sm font-medium">Company Logo*</label>
            <div className="mt-1 flex items-center border p-3 rounded-lg bg-gray-50">
              <FileImage className="w-5 h-5 text-gray-500 mr-3" />
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="text-sm font-medium">Bio Description*</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg"
              rows={3}
              required
            />
          </div>

          {/* LinkedIn */}
          <div className="mb-6">
            <label className="text-sm font-medium">LinkedIn Profile URL</label>
            <input
              name="linkedinProfileUrl"
              value={formData.linkedinProfileUrl}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          {/* Specializations */}
          <div className="mb-6">
            <label className="text-sm font-medium">Specializations*</label>
            <textarea
              name="specializations"
              value={getSpecValue()}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg"
              rows={3}
              placeholder="Hiring, Talent Acquisition, Tech Recruitment"
              required
            />
          </div>

          {/* Company Description */}
          <div className="mb-6">
            <label className="text-sm font-medium">About Your Company*</label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg"
              rows={4}
              required
            />
          </div>

          {/* Status */}
          {status && (
            <div
              className={`p-3 rounded-lg mb-4 flex items-center ${
                status.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.type === "success" ? <CheckCircle /> : <XCircle />}
              <span className="ml-2">{status.message}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-[#0F2D59] text-white rounded-lg hover:bg-[#0c2345]"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterProfile;
