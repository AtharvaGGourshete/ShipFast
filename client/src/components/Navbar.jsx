import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useTheme } from "next-themes";

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
    <nav
      className={`p-5 fixed top-0 w-full z-30 transition-all duration-300 ${
        isScrolled ? "bg-white text-black shadow-lg" : "bg-black text-white"
      }`}
    >
      <div className="grid grid-cols-2 justify-around font-raleway text-center">
        <div>
          <ul className="text-2xl font-bold">
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
          <Button variant={isScrolled ? "default" : "secondary"}>
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
