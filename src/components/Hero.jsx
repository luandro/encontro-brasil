import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = ({ title, title2, subTitle, subTitle2, onSmoothScroll }) => {
  return (
    <section className="mb-20">
      <h2 className="text-6xl font-bold mb-8 text-center text-[#FF6E40]">
        {title2}
      </h2>
      <h2 className="text-6xl font-semibold mb-6 text-center text-[#1E3D59]">
        {title}
      </h2>
      <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <img src="/logos/kaaiwar.png" alt="Logo Kaaiwar" className="w-full h-40 object-contain" />
        <img src="/logos/logo_guardioes_caru.png" alt="Logo Guardiões da Floresta Caru" className="w-full h-48 object-contain" />
        <img src="/logos/logo_guerreiras.png" alt="Logo Guerreiras da Floresta" className="w-full h-48 object-contain" />
        <img src="/logos/logo_kraho.png" alt="Logo Krahô" className="w-full h-48 object-contain" />
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-[#FF6E40] text-[#FFF5E1] hover:bg-[#1E3D59] text-xl py-3 px-8"
          onClick={() => onSmoothScroll('cronograma')}
        >
          Cronograma
        </Button>
      </div>
    </section>
  );
};

export default Hero;
