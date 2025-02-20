import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import IMAGES from "../Images/Images"


const Navbar = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="relative p-3 border-default border-1 backdrop-blur-sm transition-opacity bg-[#161616] text-white">
      <div className="grid grid-cols-2 justify-around font-raleway text-center">
        <div className="flex justify-center">
        <img src={IMAGES.image1} className="h-10 mr-2"/>

          <ul className="text-2xl font-bold mt-2">
            Ship
            <LineShadowText className="italic" shadowColor={shadowColor}>
              Fast
            </LineShadowText>
          </ul>
        </div>
        <div className="flex gap-5 items-center ml-40">
          <ul className="cursor-pointer">Home</ul>
          <ul className="cursor-pointer">About Us</ul>
          <ul className="cursor-pointer">Contact Us</ul>
          <Button
            variant={isScrolled ? "default" : "secondary"}
            className="bg-green-500"
          >
            Sign Up
          </Button>
          <Link to={"https://github.com/AtharvaGGourshete/Hackscript"}>
          <button
            type="button"
            class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 "
          >
            <svg
              class="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clip-rule="evenodd"
              />
            </svg>
            Github
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
