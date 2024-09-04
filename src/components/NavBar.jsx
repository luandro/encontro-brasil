import React from 'react';
import { Button } from "@/components/ui/button";

const NavBar = ({ onSmoothScroll }) => {
  return (
    <header className="bg-[#FF6E40] py-6 fixed w-full">
      <nav className="container mx-auto flex justify-between items-center">
        <img src="/logos/logo_awana.png" alt="Evento image 1" className="h-12 object-contain" />
        <div className="space-x-4">
          <Button variant="ghost" className="text-[#FFF5E1] hover:text-[#1E3D59] text-lg" onClick={() => onSmoothScroll('informacoes')}>Informações</Button>
          <Button variant="ghost" className="text-[#FFF5E1] hover:text-[#1E3D59] text-lg" onClick={() => onSmoothScroll('cronograma')}>Cronograma</Button>
          <Button variant="ghost" className="text-[#FFF5E1] hover:text-[#1E3D59] text-lg" onClick={() => onSmoothScroll('participants')}>Participantes</Button>
          <Button variant="ghost" className="text-[#FFF5E1] hover:text-[#1E3D59] text-lg" onClick={() => onSmoothScroll('edicao-anterior')}>I Edição</Button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
