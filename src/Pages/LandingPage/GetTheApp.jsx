import React from "react";
import appstore from "../../assets/LandingPage/GetTheApp/apple.png";   
import playstore from "../../assets/LandingPage/GetTheApp/playstore.png"; 

const GetTheApp = () => {
  return (
    <section className="bg-[#0E224D] w-full md:w-2/5 text-white py-25 px-6 flex flex-col items-center h-full text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Get The App</h2>
        <p className="text-sm text-gray-200 mb-6">
          Experience the power of NextStep anywhere with our quick apply feature.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* App Store Button */}
          <a
            href="#"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img src={appstore} className="w-6 h-6 invert"/>
            <div className="text-left">
              <p className="text-xs">Download On</p>
              <p className="text-sm font-semibold">App Store</p>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            
            <img src={playstore} alt="Google Play" className="w-6 h-6" />
            <div className="text-left">
              <p className="text-xs"> Get it On</p>
              <p className="text-sm font-semibold">Google Play Store</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GetTheApp;
