"use client";

import { Typography } from "@material-tailwind/react";

import EventContentCard from "@/components/event-content-card";

export type EventContentProps = {
  title: string;
  speakers: {
    title: string;
    name: string;
    position: string;
    panel: string;
    img: string;
  }[]
}

export function EventContent({title, speakers}:EventContentProps) {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="w-full flex mb-8 flex-col items-center">
        <Typography variant="h2" className="block text-center antialiased font-sans text-blue-gray-900 text-5xl font-bold leading-tight lg:w-3/4">
          {title}
        </Typography>
      </div>
      <div className="mx-auto container">
        {speakers?.map((props, idx) => (
          <EventContentCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default EventContent;
