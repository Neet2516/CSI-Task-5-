import React, { useState } from "react";

const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    salaryCurrency: "USD", // backend preferred
    description: "",
    responsibilities: "",
   qualifications: "",
    experienceRequired: "",
    skills: "",
    applicationDeadline: "",
  });

  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------
    // FIX 1 → Salary Validation
    // -----------------------------
    if (Number(formData.minSalary) > Number(formData.maxSalary)) {
      alert("Min Salary cannot be greater than Max Salary");
      return;
    }

    // -----------------------------
    // FIX 2 → Deadline Format
    // Must be: YYYY-MM-DDT00:00:00
    // -----------------------------
    const deadlineDate = formData.applicationDeadline.split("T")[0] + "T00:00:00";

    // -----------------------------
    // FIX 3 → Final Body Shape
    // -----------------------------
    const body = {
      title: formData.title.trim(),
      location: formData.location.trim(),
      jobType: formData.jobType,
      minSalary: Number(formData.minSalary),
      maxSalary: Number(formData.maxSalary),
      salaryCurrency: formData.salaryCurrency.toUpperCase(),
      description: formData.description,
      responsibilities: formData.responsibilities,
      qualifications: formData.qualifications,
      experienceRequired: formData.experienceRequired,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : [],
      applicationDeadline: deadlineDate,
    };

    console.log("Final Sent Body → ", body);

    try {
      const res = await fetch("https://job-portal-my15.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.status === 201) {
        alert("Job Created Successfully!");
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create Job Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Job Title (e.g., Senior Java Developer)"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Job Type</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="REMOTE">Remote</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="minSalary"
            placeholder="Min Salary"
            value={formData.minSalary}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="maxSalary"
            placeholder="Max Salary"
            value={formData.maxSalary}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <input
          type="text"
          name="salaryCurrency"
          placeholder="INR or USD"
          value={formData.salaryCurrency}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-28 resize-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="responsibilities"
          placeholder="Responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="qualifications"
          placeholder="Qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="experienceRequired"
          placeholder="Experience Required (e.g., 3+ years)"
          value={formData.experienceRequired}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="datetime-local"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default ApplicationPage;
