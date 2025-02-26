"use client";

import { Bar, BarChart } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

export default function Component() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap"
        rel="stylesheet"
      />
    <div className="bg-[#161616] min-h-screen text-white font-quicksand p-20">
    <ChartContainer config={chartConfig} className="min-h-[200px] bg-[#161616] w-1/2 mx-auto text-white">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
    <p className="text-center font-quicksand tracking-wide mt-5 text-2xl">Sales for the year 2025</p>
    </div>
    </>
  );
}
