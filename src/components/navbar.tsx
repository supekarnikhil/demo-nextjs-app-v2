import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Cta, { CtaProps } from "./cta";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="paragraph"
        className="flex items-center gap-2 font-medium"
      >
        {children}
      </Typography>
    </li>
  );
}

export type NavbarProps = {
  logo: {
    url: string;
    alt: string;
  };
  menuItems: {
    icon?: string;
    name: string;
    href: string;
  }[];
  ctas: CtaProps[];
};

export function Navbar({ logo, menuItems, ctas }: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      blurred={false}
      color={isScrolling ? "white" : "white"}
      className="fixed top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <img width="200px" height="70px" src={logo.url} alt={logo.alt} />
        </div>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-gray-900"
          }`}
        >
          {menuItems?.map(({ name, icon: Icon, href }: any) => (
            <NavItem key={name} href={href}>
              {Icon ? <Icon className="h-5 w-5" /> : null}
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          {ctas?.map((item:any) => (
            <Cta key={item.text} {...item} />
          ))}
        </div>
        <IconButton
          variant="text"
          color={isScrolling ? "gray" : "white"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-gray-900">
            {menuItems.map(({ name, icon: Icon, href }: any) => (
              <NavItem key={name} href={href}>
                {Icon ? <Icon className="h-5 w-5" /> : null}
                <span>{name}</span>
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4">
            {ctas.map((item) => (
              <Cta key={item.text} {...item} />
            ))}
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
