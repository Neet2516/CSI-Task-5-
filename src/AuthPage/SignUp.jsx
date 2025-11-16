import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../assets/login/google.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const togglePasswordVisibility = (field) => {
    if (field === "password") setPasswordShown(!passwordShown);
    if (field === "confirmPassword") setConfirmPasswordShown(!confirmPasswordShown);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    const API_URL = "https://job-portal-my15.onrender.com/api/auth/register";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseBodyText = await response.text();
      console.log(responseBodyText);

      if (response.ok) {
        navigate("/auth/verify-otp", { state: { email: formData.email } });
      } else {
        let errorData = responseBodyText;
        try {
          errorData = JSON.parse(responseBodyText);
        } catch {}
        setError(errorData.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("A network error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
        
        {/* Logo */}
        <img src={logo} className="h-12 w-12 mb-4" alt="logo" />

        {/* Header Section */}
        <div className="flex flex-col my-4 text-center max-w-sm">
          <div className="text-[#15294B] font-bold poppins-semibold text-3xl sm:text-4xl">
            Your work people are here
          </div>
          <div className="text-black text-base poppins-light mt-2">
            Sign up now to get started with an account
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#f1f5fa] w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-10 rounded-xl shadow-2xl">

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">

            {/* Full Name */}
            <div className="mb-6 w-full flex justify-center">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-[90%] sm:w-[80%] pb-2 border-b border-gray-300 
                focus:border-blue-700 outline-none text-gray-700 placeholder-gray-500 transition"
              />
            </div>

            {/* Email */}
            <div className="mb-6 w-full flex justify-center">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-[90%] sm:w-[80%] pb-2 border-b border-gray-300 focus:border-blue-700 
                outline-none text-gray-700 placeholder-gray-500 transition"
              />
            </div>

            {/* Password */}
            <div className="mb-6 w-full flex justify-center relative">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-[90%] sm:w-[80%] pb-2 border-b border-gray-300 
                focus:border-blue-700 outline-none text-gray-700 placeholder-gray-500 pr-10 transition"
              />
              <button
                type="button"
                className="absolute right-[5%] top-0 mt-1 text-gray-500 hover:text-gray-700"
                onClick={() => togglePasswordVisibility("password")}
              >
                {passwordShown ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="mb-6 w-full flex justify-center relative">
              <input
                type={confirmPasswordShown ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-[90%] sm:w-[80%] pb-2 border-b border-gray-300 
                focus:border-blue-700 outline-none text-gray-700 placeholder-gray-500 pr-10 transition"
              />
              <button
                type="button"
                className="absolute right-[5%] top-0 mt-1 text-gray-500 hover:text-gray-700"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {confirmPasswordShown ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-center mb-4 w-[90%] sm:w-[80%]">{error}</p>
            )}

            {/* Terms */}
            <div className="flex w-[90%] sm:w-[80%] items-center justify-center mb-8 text-sm text-black">
              <input
                type="checkbox"
                id="terms"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                required
                className="h-4 w-4 text-blue-700 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2">
                I agree to the <span className="font-semibold text-gray-800">Terms of Service</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-[90%] sm:w-[80%] py-3 bg-[#15294B] text-white font-semibold 
              rounded-lg hover:bg-blue-800 transition shadow-md disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Get Started"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex justify-center text-xs my-6">
            <span className="absolute left-0 right-0 h-px bg-gray-200 top-1/2 transform -translate-y-1/2"></span>
            <span className="relative bg-[#f1f5fa] px-2 text-gray-400">OR</span>
          </div>

          {/* Google Button */}
          <center>
            <button
              className="w-[90%] sm:w-[80%] py-2 flex items-center justify-center border border-gray-300 
              text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              <img src={google} alt="Google" className="w-5 h-5 mr-3" />
              Sign up with Google
            </button>
          </center>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="font-semibold text-blue-900 hover:text-blue-700 ml-1">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
