import React, { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useTheme } from "next-themes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const { resolvedTheme } = useTheme();
  const [shadowColor, setShadowColor] = useState("white");

  useEffect(() => {
    setShadowColor(resolvedTheme === "dark" ? "white" : "black");
  }, [resolvedTheme]);

  return (
    <>
      {/* Google Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap"
        rel="stylesheet"
      />

      <div className="relative min-h-screen bg-[#161616] flex flex-col items-center justify-center px-6">
        

        {/* Hero Section */}
        <div className="relative text-center text-white py-32 font-quicksand">
          <h1 className="text-balance text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Ship{" "}
            <LineShadowText className="italic text-green-500" shadowColor={shadowColor}>
              Fast
            </LineShadowText>
          </h1>
          <p className="text-lg mt-4 text-gray-300">Speed You Can Trust!</p>
          <span className="tracking-wide text-2xl">
            Reliable. Efficient. Delivered.
          </span>
        </div>

        {/* FAQ Accordion Section */}
        <div className="w-full max-w-5xl mt-10 bg-[#161616] text-white font-quicksand rounded-xl p-10 mb-10 shadow-lg">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match the other
                components' aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
