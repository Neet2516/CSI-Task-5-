import React, { useState } from "react";
import { UploadCloud, FileText, Image, Code, CheckCircle, XCircle } from "lucide-react";

// ===================== FileInput Component =====================
const FileInput = ({ id, label, icon: Icon, note, onChange, hasFile }) => (
  <div className="flex flex-col mb-6 bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-inner">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
      <Icon className="w-5 h-5 mr-2 text-indigo-500" />
      {label}
    </label>

    <div className="relative">
      <input
        type="file"
        id={id}
        name={id}
        onChange={onChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white
        file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm 
        file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {hasFile && (
        <span className="absolute top-1 right-1 text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">
          File Selected
        </span>
      )}
    </div>

    <p className="text-xs text-gray-500 mt-2">{note}</p>
  </div>
);

// ===================== MAIN COMPONENT =====================
const ProfilePage = () => {
  const ENDPOINT = "https://job-portal-my15.onrender.com/api/job-seeker/profile";

  // ------------------ Unified State ------------------
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    languages: [],
    bio: "",
    skills: [],
    educations: [],
    experiences: [],
    privacyConsent: false,
    contactConsent: false,
  });

  const [files, setFiles] = useState({
    resume: null,
    profileImage: null,
    additionalFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // ===================== Handle Input Change =====================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Checkbox
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // Skills, educations, experiences
    if (["skills", "educations", "experiences"].includes(name)) {
      const arrayValue = value.split(",").map((v) => v.trim()).filter((v) => v);
      setFormData((prev) => ({ ...prev, [name]: arrayValue }));
      return;
    }

    // Single language
    if (name === "languages") {
      setFormData((prev) => ({ ...prev, languages: value ? [value] : [] }));
      return;
    }

    // Standard inputs
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ===================== Handle File Change =====================
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] || null }));
  };

  // ===================== Submit Handler =====================
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatus(null);

  const token = localStorage.getItem("accessToken");
  if (!token) {
    setStatus({ type: "error", message: "No access token — please login." });
    setLoading(false);
    return;
  }

  // Build payload exactly from your formData state
  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    bio: formData.bio,
    languages: formData.languages,       // array
    skills: formData.skills,             // array
    educations: formData.educations,     // array
    experiences: formData.experiences,   // array
    // you can omit privacyConsent/contactConsent — backend may not expect them
  };

  // Basic client validation (optional but helpful)
  if (!payload.firstName || !payload.lastName || !payload.email || !payload.phoneNumber || !payload.bio) {
    setStatus({ type: "error", message: "Please fill all required text fields." });
    setLoading(false);
    return;
  }
  if (!Array.isArray(payload.languages) || payload.languages.length === 0 ||
      !Array.isArray(payload.skills) || payload.skills.length === 0 ||
      !Array.isArray(payload.educations) || payload.educations.length === 0 ||
      !Array.isArray(payload.experiences) || payload.experiences.length === 0) {
    setStatus({ type: "error", message: "Please fill required list fields (languages, skills, educations, experiences)." });
    setLoading(false);
    return;
  }

  try {
    const fd = new FormData();

    // <-- KEY CHANGE: send the 'data' part as application/json -->
    fd.append("data", new Blob([JSON.stringify(payload)], { type: "application/json" }));

    // Append files (if present)
    if (files.resume) fd.append("resume", files.resume);
    if (files.profileImage) fd.append("profileImage", files.profileImage);
    if (files.additionalFile) fd.append("additionalFile", files.additionalFile);

    // Debug: show what we are sending (File objects will show in console)
    console.log("--- FormData Before API Call ---");
    for (const pair of fd.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // DO NOT set Content-Type
      },
      body: fd,
    });

    // Read response safely: try JSON, fallback to text
    let result;
    const text = await res.text();
    try {
      result = text ? JSON.parse(text) : null;
    } catch (err) {
      result = { raw: text };
    }

    if (!res.ok) {
      // Show server validation message if present
      const serverMsg =
        (result && (result.message || result.error)) ||
        (result && result.raw) ||
        `Request failed: ${res.status} ${res.statusText}`;
      setStatus({ type: "error", message: serverMsg });
      console.error("Server error detail:", result);
    } else {
      setStatus({ type: "success", message: (result && result.message) || "Profile created/updated successfully." });
      // Optionally reset your form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        languages: [],
        bio: "",
        skills: [],
        educations: [],
        experiences: [],
        privacyConsent: false,
        contactConsent: false,
      });
      setFiles({ resume: null, profileImage: null, additionalFile: null });
      navigate("jobs/submit")
    }
  } catch (err) {
    console.error("Network/submit error:", err);
    setStatus({ type: "error", message: "Network error: " + err.message });
  } finally {
    setLoading(false);
  }
};


  // Helpers
  const getListValue = (key) => (formData[key]?.length ? formData[key].join(", ") : "");
  const getLanguageValue = () => (formData.languages[0] ? formData.languages[0] : "");

  // ===================== UI =====================
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <UploadCloud className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Job Seeker Profile</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal */}
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              value={formData.lastName}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number*"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
            <select
              name="languages"
              value={getLanguageValue()}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-white"
              required
            >
              <option value="">Select Language*</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <textarea
            name="bio"
            placeholder="Bio*"
            value={formData.bio}
            onChange={handleChange}
            className="w-full mt-4 p-3 border rounded-lg"
            required
          />

          {/* Files */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <FileInput
              id="resume"
              label="Upload Resume"
              icon={FileText}
              note="PDF / DOCX"
              onChange={handleFileChange}
              hasFile={!!files.resume}
            />

            <FileInput
              id="profileImage"
              label="Profile Image"
              icon={Image}
              note="JPG / PNG"
              onChange={handleFileChange}
              hasFile={!!files.profileImage}
            />

            <FileInput
              id="additionalFile"
              label="Additional File"
              icon={Code}
              note="Optional"
              onChange={handleFileChange}
              hasFile={!!files.additionalFile}
            />
          </div>

          {/* Lists */}
          <textarea
            name="skills"
            placeholder="Skills (comma separated)*"
            value={getListValue("skills")}
            onChange={handleChange}
            className="w-full mt-4 p-3 border rounded-lg"
            required
          />

          <textarea
            name="educations"
            placeholder="Educations (comma separated)*"
            value={getListValue("educations")}
            onChange={handleChange}
            className="w-full mt-4 p-3 border rounded-lg"
            required
          />

          <textarea
            name="experiences"
            placeholder="Experiences (comma separated)*"
            value={getListValue("experiences")}
            onChange={handleChange}
            className="w-full mt-4 p-3 border rounded-lg"
            required
          />

          {/* Status */}
          {status && (
            <div
              className={`mt-4 p-3 rounded-lg flex items-center ${
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
            className="w-full mt-6 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Submitting..." : "Submit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
