// components
import { Navbar, Footer, NavbarProps, VARIANT } from "@/components";

// sections
import Hero, { HeroProps } from "../hero";
import SponsoredBy, { SponsoredByProps } from "../sponsored-by";
import OurStats, { StatsProps } from "../our-stats";
import EventContent, { EventContentProps } from "../event-content";
import Faq, { FaqProps } from "../faq";

const getHeroProps = (props: any): HeroProps => {
  return {
    bgUrl: process.env.CMS_BASE_URL + props?.heroImage?.data?.attributes?.url,
    heroText: props?.heroText,
    ctas: props?.ctas?.map((item: any) => ({
      text: item?.text,
      link: item?.link,
      variant: item?.variant,
      type: item?.type,
      startIcon: item?.startIcon,
    })),
  };
};

const getNavbarProps = (props: any): NavbarProps => {
  return {
    logo: {
      url: process.env.CMS_BASE_URL + props?.logo?.data?.attributes?.url,
      alt: props?.logo?.data?.attributes?.alternativeText,
    },
    menuItems: props?.menuItems?.map((item: any) => ({
      name: item?.name,
      icon: item?.icon,
      href: item?.link,
    })),
    ctas: props?.ctas?.map((item: any) => ({
      text: item?.text,
      link: item?.link,
      variant: item?.variant,
      type: item?.type,
      startIcon: item?.startIcon,
    })),
  };
};

const getStatsProps = (props: any): StatsProps => {
  return {
    title: props?.title,
    subtitle: props?.subtitle,
    shortDesc: props?.shortDesc,
    highlights: props?.highlights,
  };
};

const getSponsoredByProps = (props: any): SponsoredByProps => {
  return {
    sponsors: props?.sponsors?.data?.map((item: any) => ({
      imageUrl: process.env.CMS_BASE_URL + item?.attributes?.url,
      alt: item?.attributes?.alternativeText,
    })),
  };
};

const getFaqsByProps = (props: any): FaqProps => {
  return {
    title: props?.title,
    shortDesc: props?.shortDesc,
    faqs: props?.faqs,
  };
};

const getEventContentByProps = (props: any): EventContentProps => {
  return {
    title: props?.title,
    speakers: props?.speakers?.map((item: any) => ({
      title: item?.title,
      name: item?.name,
      position: item?.position,
      panel: item?.panel,
      img: process.env.CMS_BASE_URL + item?.img?.data?.attributes?.url,
    })),
  };
};

const getSectionsComponent = ({ id, __component, ...rest }: any) => {
  if(rest?.isShow === false) return null;

  const componentId = (__component === 'sections.single-type-id') ? rest?.singleTypeId : __component;
  const data = (__component === 'sections.single-type-id') ? rest?.data : rest;
  switch(componentId) {
    case "sections.navbar":
    case "nav-bar":
      return <Navbar key={`index-${componentId}-${id}`} {...getNavbarProps(data)} />;
    case "sections.hero":
      return <Hero key={`index-${componentId}-${id}`} {...getHeroProps(data)} />;
    case "sections.sponsored-by":
      return <SponsoredBy key={`index-${componentId}-${id}`} {...getSponsoredByProps(data)} />;
    case "sections.our-stats":
      return <OurStats key={`index-${componentId}-${id}`} {...getStatsProps(data)} />;
    case "sections.event-content": 
      return <EventContent key={`index-${componentId}-${id}`} {...getEventContentByProps(data)} />;
    case "sections.faq":
      return <Faq key={`index-${componentId}-${id}`} {...getFaqsByProps(data)} />;
    case "sections.footer":
    case "footer":
      return <Footer key={`index-${componentId}-${id}`} {...data} />;
    default:
      return null;
  }
};

export default async function Portfolio({ params }: any) {
    const res = await fetch(
      `${process.env.CMS_BASE_URL}/api/landing-pages?filters[slug]=${params?.slug}&populate=deep`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.CMS_TOKEN,
      },
      // next: { revalidate: 60 },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const sections = data?.data?.[0]?.attributes?.sections || [];

  const singleTypes = sections?.filter(
    (item: any) =>
      item?.__component === "sections.single-type-id" && item?.isShow
  );

  const singleTypeResponses = await Promise.all(singleTypes.map(
    (singleType: any) =>  fetch(`${process.env.CMS_BASE_URL}/api/${singleType?.singleTypeId}?populate=deep`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CMS_TOKEN,
        },
        // next: { revalidate: 60 },
        cache: "no-store",
      })
  ));

  for (let i = 0; i < singleTypes.length; i += 1) {
    singleTypes[i].data = (await singleTypeResponses[i].json())?.data?.attributes?.singleTypeComponent;
  }

  return <>{sections?.map(getSectionsComponent)}</>;
}
