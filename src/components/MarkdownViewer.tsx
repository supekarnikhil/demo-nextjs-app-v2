import { Typography } from "@material-tailwind/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const H1 = ({ children }: any) => (
  <Typography
    variant="h1"
    color="white"
    className="lg:max-w-3xl uppercase font-thin text-8xl leading-snug"
  >
    {children}
  </Typography>
);

const H2 = ({ children }: any) => (
  <Typography variant="h2" color="white" className="mb-2">
    {children}
  </Typography>
);

const H3 = ({ children }: any) => (
  <Typography variant="h3" color="white" className="mb-2">
    {children}
  </Typography>
);

const Lead = ({ children }: any) => (
  <Typography
    variant="lead"
    color="white"
    className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
  >
    {children}
  </Typography>
);

const customComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Lead,
};

export function MarkdownViewer({ children }: any) {
  return (
    <div className="whitespace-pre-wrap">
      <Markdown rehypePlugins={[rehypeRaw]} components={customComponents}>
        {children}
      </Markdown>
    </div>
  );
}
