"use client";

import { Typography } from "@material-tailwind/react";
import StatsCard from "@/components/stats-card";

export type StatsProps = {
  title: string;
  subtitle: string;
  shortDesc: string;
  highlights: {
    title: string;
    count: string;
  }[];
};

export function OurStats({
  title,
  subtitle,
  shortDesc,
  highlights,
}: StatsProps) {
  return (
    <section className="container mx-auto grid gap-10 px-8 py-44 lg:grid-cols-1 lg:gap-20 xl:grid-cols-2 xl:place-items-center">
      <div>
        <Typography variant="h6" color="orange" className="mb-6 font-medium">
          {subtitle}
        </Typography>
        <Typography
          className="text-5xl font-bold leading-tight lg:w-3/4"
          color="blue-gray"
        >
          {title}
        </Typography>
        <Typography
          variant="lead"
          className="mt-3 w-full !text-gray-500 lg:w-9/12"
        >
          {shortDesc}
        </Typography>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-8 gap-x-28">
          {highlights?.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurStats;
