import React from 'react';
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';

const Hero = ({ content, onSmoothScroll }) => {
  const lines = content.split('\n');
  const title = lines[0].replace('# ', '');
  const title2 = lines[2].replace('## ', '');
  const subTitle = lines[4].replace('## ', '');

  const logoRegex = /!\[(.*?)\]\((.*?)\)/g;
  const logos = [...content.matchAll(logoRegex)].slice(0, 4);

  return (
    <section className="mb-20">
      <h2 className="text-6xl font-bold mb-8 text-center text-[#FF6E40]">
        {title2}
      </h2>
      <h2 className="text-6xl font-semibold mb-6 text-center text-[#1E3D59]">
        {title}
      </h2>
      <h3 className="text-4xl font-medium mb-12 text-center text-[#1E3D59]">
        {subTitle}
      </h3>
      <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {logos.map((logo, index) => (
          <img key={index} src={logo[2]} alt={logo[1]} className="w-full h-48 object-contain" />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-[#FF6E40] text-[#FFF5E1] hover:bg-[#1E3D59] text-xl py-3 px-8"
          onClick={() => onSmoothScroll('schedule')}
        >
          Schedule
        </Button>
      </div>
    </section>
  );
};

export default Hero;
