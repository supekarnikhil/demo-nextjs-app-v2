"use client";

import { Typography } from "@material-tailwind/react";

export type SponsoredByProps = {
  sponsors: {
    imageUrl: string;
    alt: string;
  }[]
}

export function SponsoredBy({sponsors}: SponsoredByProps) {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <Typography variant="h6" color="blue-gray" className="mb-8">
          SPONSORED BY
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {sponsors?.map((item, key) => (
            <img
              width={256}
              height={256}
              key={key}
              src={`${item?.imageUrl}`}
              alt={item?.alt}
              className="w-40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsoredBy;
