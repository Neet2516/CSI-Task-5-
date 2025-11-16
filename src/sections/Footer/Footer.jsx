import React from 'react';

import apple from '../../assets/footer/apple.png'
import facebook from '../../assets/footer/facebook.png'
import google from '../../assets/footer/google.png'
import { Link } from 'react-router';
const Footer = () => {
  // Define the navigation links and resources data structure
  const footerLinks = [
    {
      title: 'About',
      links: ['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'],
    },
    {
      title: 'Resources',
      links: ['Help Docs', 'Guide', 'Updates', 'Contact Us'],
    },
  ];

  return (
    <footer className=" libre-regular bg-linear-to-t from-[#2a3044] to-[#687395] text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo/Description, Links, and Subscription */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-600/50 pb-12">
          
          {/* Column 1: Logo and Description */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              {/* Replace with your actual Logo component or image */}
              <span className="text-xl font-bold text-white"><Link to="/">NextStep</Link></span>
            </div>
            {/* Description */}
            <p className="text-sm leading-relaxed">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>
          
          {/* Columns 2 & 3: Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href={`about`} 
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Get Job Notifications (Subscription) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get job notifications</h4>
            <p className="text-sm">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            {/* Email Subscription Form (Inline) */}
            <form className="flex mt-4">
              <input
                type="email"
                placeholder="Email Address"
                className="py-2 px-3 text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mr-3 grow w-3/5"
                required
              />
              <button
                type="submit"
                className="bg-[#25396D] text-white py-2 px-4  font-medium hover:bg-[#1f305c] transition-colors w-2/5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright and Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-sm">
          {/* Copyright */}
          <p className="order-2 sm:order-1 mt-4 sm:mt-0">
            2025 @ NextStep. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 order-1 sm:order-2">
            {/* You can use your actual image assets here, I'm using icons for demonstration */}
            <div className="w-8 h-8 flex items-center justify-center  transition-colors cursor-pointer">
              <img src={facebook} size={18} />
            </div>
            <div className="w-8 h-8 flex items-center justify-center transition-colors cursor-pointer">
              <img src={apple} size={18} />
            </div>
            <div className="w-8 h-8 flex items-center justify-center  transition-colors cursor-pointer">
              <img src={google} size={18} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;