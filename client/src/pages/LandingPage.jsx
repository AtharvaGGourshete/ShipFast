import React, { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LandingPage = () => {
  const { resolvedTheme } = useTheme();
  const [shadowColor, setShadowColor] = useState("white");
  const [date, setDate] = useState(null); // Add this line

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
            <LineShadowText
              className="italic text-green-500"
              shadowColor={shadowColor}
            >
              Fast
            </LineShadowText>
          </h1>
          <p className="text-lg mt-4 text-gray-300">Speed You Can Trust!</p>
          <span className="tracking-wide text-2xl">
            Reliable. Efficient. Delivered.
          </span>
          <p className="tracking-wide text-xl font-raleway ml-72 mr-72 mt-7">
            ShipFast Logistics ensures fast, reliable global deliveries with
            guaranteed on-time shipping. Trusted by businesses worldwide, we
            prioritize efficiency, precision, and customer satisfaction. Backed
            by successful testimonials, our seamless logistics services make
            shipping hassle-free. Choose ShipFast for speed, reliability, and
            excellence in every delivery.
          </p>
          <div className="flex gap-5 justify-center items-center">
            <Button className="bg-green-500 text-black mt-3 hover:bg-white hover:text-black">
              Set up your first delivery
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground mt-3"
                  )}
                >
                  <CalendarIcon className="mr-2 text-black" />
                  {date ? format(date, "PPP") : <span className="text-black">Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto bg-[#141414] text-white p-0 border-0" align="center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="w-full max-w-5xl mt-10 bg-[#161616] text-white font-quicksand rounded-xl p-10 mb-10 shadow-lg">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:text-green-500">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="hover:text-green-500">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:text-green-500">
                Is it styled?
              </AccordionTrigger>
              <AccordionContent className="hover:text-green-500">
                Yes. It comes with default styles that match the other
                components' aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:text-green-500">
                Is it animated?
              </AccordionTrigger>
              <AccordionContent className="hover:text-green-500">
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

