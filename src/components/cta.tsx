import React from "react";
import { Button } from "@material-tailwind/react";
import { TicketIcon } from "@heroicons/react/24/solid";

export type CtaProps = {
  text: string;
  link: string;
  variant: string;
  type: string;
  startIcon: string;
};

const getIcon = (iconKey: string) => {
  switch (iconKey) {
    case "TicketIcon":
      return TicketIcon;
    default:
        return null;
  }
};

export function Cta({ link, text, variant, type, startIcon }: CtaProps) {
const Icon = getIcon(startIcon);
  return (
    <>
      <Button href={link} variant={variant} color={type==='primary'?'orange':'white'}>
        {startIcon && <Icon className="inline" width={15} />} {text}
      </Button>
    </>
  );
}

export default Cta;
