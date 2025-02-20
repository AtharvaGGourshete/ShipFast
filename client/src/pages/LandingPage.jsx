import React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { AuroraText } from "@/components/ui/aurora-text";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useTheme } from "next-themes";

const LandingPage = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <div className="relative min-h-screen bg-black items-center overflow-hidden">
        {/* Grid Background */}
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={5}
          gridGap={15}
          color="#6B7280"
          maxOpacity={0.4}
          flickerChance={0.1}
          height={800}
          width={2000}
        />

        <div className="relative text-center text-white z-10 py-60 font-raleway">
          <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Ship
            <LineShadowText className="italic" shadowColor={shadowColor}>
              Fast
            </LineShadowText>
          </h1>
          <p className="text-lg mt-4 text-gray-300 mb-5">Speed You Can Trust!</p>
          <span className="tracking-wide text-2xl">Reliable. Efficient. Delivered.</span>
        </div>
        
      </div>
    </>
  );
};

export default LandingPage;
