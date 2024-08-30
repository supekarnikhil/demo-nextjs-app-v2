"use client";

import React from "react";
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export type FaqProps = {
  title: string;
  shortDesc: string;
  faqs: {
    title: string;
    desc: string;
  }[];
};

export function Faq({ title, shortDesc, faqs }: FaqProps) {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          {title ? (
            <Typography variant="h1" color="blue-gray" className="mb-4">
              {title}
            </Typography>
          ) : null}
          {shortDesc ? (
            <Typography
              variant="lead"
              className="mx-auto mb-24 lg:w-3/5 !text-gray-500"
            >
              {shortDesc}
            </Typography>
          ) : null}
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {faqs?.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              onClick={() => handleOpen(key + 1)}
            >
              <AccordionHeader className="text-left text-gray-900">
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-500"
                >
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
