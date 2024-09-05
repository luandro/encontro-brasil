import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const NavBar = ({ onSmoothScroll, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: 'Informações', target: 'informacoes' },
    { label: 'Schedule', target: 'schedule' },
    { label: 'Participantes', target: 'participants' },
    { label: 'Edições Anteriores', target: 'edicoes-anteriores' },
  ];

  return (
    <header className="bg-[#FF6E40] py-6 fixed w-full z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <img 
          src="/logos/logo_awana.png" 
          alt="Evento image 1" 
          className="h-12 object-contain cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        
        {/* Menu para desktop */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.target}
              variant="ghost"
              className={`text-[#FFF5E1] hover:text-[#1E3D59] text-lg ${activeSection === item.target ? 'bg-[#1E3D59] text-[#FFF5E1]' : ''}`}
              onClick={() => onSmoothScroll(item.target)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Botão do menu hambúrguer para mobile */}
        <button
          className="md:hidden text-[#FFF5E1] focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FF6E40] py-2">
          {navItems.map((item) => (
            <Button
              key={item.target}
              variant="ghost"
              className={`w-full text-left text-[#FFF5E1] hover:text-[#1E3D59] text-lg py-2 ${activeSection === item.target ? 'bg-[#1E3D59] text-[#FFF5E1]' : ''}`}
              onClick={() => {
                onSmoothScroll(item.target);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </header>
  );
};

export default NavBar;
