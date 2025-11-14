import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BASE_API_URL = 'https://job-portal-my15.onrender.com';

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000; // 1 second


const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // The email is passed in the state, either from SignUp or the 403 redirect in ChooseRole
    const email = location.state?.email || 'your_email@example.com'; 

    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(location.state?.message || 'Please check your inbox.');

    const inputRefs = useRef([]);
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


    const handleOtpChange = (index, value) => {
        if (isSubmitting) return;

        // Only allow single digit or empty string
        const newDigit = value.slice(-1).replace(/[^0-9]/g, '');
        
        const newOtp = [...otp];
        newOtp[index] = newDigit;
        setOtp(newOtp);

        // Move focus to the next box if a digit was entered and it's not the last box
        if (newDigit && index < 5) {
            inputRefs.current[index + 1].focus();
        } 
        
        // Clear errors/messages on user input
        setError(null);
        setMessage(null);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };


    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
        
        if (pasteData.length === 6) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            // Move focus to the last input box
            inputRefs.current[5].focus();
        }
    };


    const executeFetchWithRetry = async (url, options, attempt = 0) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok && response.status >= 500 && attempt < MAX_RETRIES) {
                // Retry only for server errors (5xx)
                const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt);
                await delay(delayMs);
                return executeFetchWithRetry(url, options, attempt + 1);
            }
            return response;
        } catch (err) {
            if (attempt < MAX_RETRIES) {
                const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt);
                await delay(delayMs);
                return executeFetchWithRetry(url, options, attempt + 1);
            }
            throw err;
        }
    };


    const handleVerification = async (e) => {
        e.preventDefault();
        const fullOtp = otp.join('');

        if (fullOtp.length !== 6) {
            setError('Please enter the complete 6-digit code.');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setMessage(null);

        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email : `${email}`, otp: `${fullOtp}` }),
            };
            
            const response = await executeFetchWithRetry(`${BASE_API_URL}/api/auth/verify-otp`, options);

            let data;
try {
  const text = await response.text();
  data = JSON.parse(text);
} catch {
  data = { message: 'OTP verified successfully!' };
  localStorage.setItem("USERDETAILS",JSON.stringify({ email: email}) );
  navigate("/choose-role");
 
}


            if (response.ok) {
                navigate('/choose-role', { state: { message: 'Account successfully verified! Please log in.' } });
            } else {
                setError(data.message || 'OTP verification failed. Please try again.');
            }
        } catch (err) {
            console.error('OTP Verification Error:', err);
            setError('A network error occurred during verification. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOTP = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError(null);
        setMessage(null);

        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            };

            const response = await executeFetchWithRetry(`${BASE_API_URL}/api/auth/resend-otp`, options);
            const data = await response.json();

            if (response.ok) {
                setMessage('A new 6-digit code has been sent.');
            } else {
                setError(data.message || 'Failed to resend OTP. Please try again later.');
            }
        } catch (err) {
            console.error('Resend OTP Error:', err);
            setError('A network error occurred while resending the code.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Set initial focus on the first input box when the component mounts
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    return (
        <div className="flex w-full lg:w-1/3 flex-col justify-center items-center min-h-screen p-4">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-sm">
                
                {/* Back Button (Now using Inline SVG) */}
                <button 
                    onClick={() => navigate("/register")} 
                    className="mb-8 p-2 rounded-full border border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition"
                    aria-label="Go back"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>

                {/* Header */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
                    Verify OTP
                </h2>
                
                {/* Description */}
                <p className="text-gray-500 mb-8 text-center text-sm leading-relaxed">
                    A 6-digit code has been sent to <span className="font-semibold text-gray-800">{email}</span>. Enter the OTP
                </p>

                <form onSubmit={handleVerification}>
                    {/* OTP Input Boxes */}
                    <div className="flex justify-center space-x-2 mb-8" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                disabled={isSubmitting}
                                className="w-10 h-12 text-center text-xl font-bold rounded-lg border-2 border-gray-300 focus:border-[#15294B] outline-none transition duration-200 bg-white shadow-sm"
                                style={{ caretColor: 'transparent' }} // Hide cursor for cleaner look
                            />
                        ))}
                    </div>

                    {/* Status Messages */}
                    {error && (
                        <p className="text-red-600 text-center mb-4 text-sm font-medium">{error}</p>
                    )}
                    {message && (
                        <p className="text-green-600 text-center mb-4 text-sm font-medium">{message}</p>
                    )}

                    {/* Verify OTP Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#15294B] text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-300 shadow-lg disabled:bg-gray-400"
                        disabled={isSubmitting || otp.join('').length !== 6}
                    >
                        {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>

                {/* Resend Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Didn't receive the code? 
                    <button
                        onClick={handleResendOTP}
                        disabled={isSubmitting}
                        className="font-semibold text-[#15294B] hover:text-blue-700 ml-1 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        Resend OTP
                    </button>
                </p>
            </div>
        </div>
    );
};

export default VerifyOTP;

