import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#161616] text-white py-6 items-center">
      <div className="container mx-auto text-center flex justify-evenly items-center gap-8 ">
        <p className="text-sm">&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <div className="flex justify-center space-x-4 ">
          <a href="#about" className="hover:text-gray-400 ">About Us</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
          <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
