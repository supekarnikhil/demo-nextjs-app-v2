"use client";

import Cta, { CtaProps } from "@/components/cta";
import { MarkdownViewer } from "@/components/MarkdownViewer";

export type HeroProps = {
  bgUrl: string;
  heroText: string;
  ctas: CtaProps[];
}

function Hero({bgUrl, heroText, ctas}: HeroProps) {
  return (
    <div style={{backgroundImage: `url(${bgUrl})`}} className={`relative min-h-screen w-full bg-center bg-cover bg-no-repeat`}>
    <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
    <div className="grid min-h-screen px-8">
      <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">

         <MarkdownViewer>{heroText}</MarkdownViewer>

        <div className="flex items-center gap-4">
          {ctas?.map((item:any) => (
            <Cta key={item.text} {...item} />
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Hero;
