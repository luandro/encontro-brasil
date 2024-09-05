import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Info from '@/components/Info';
import Schedule from '@/components/Schedule';
import Participants from '@/components/Participants';
import PastEditions from '@/components/PastEditions';
import Footer from '@/components/Footer';

const fetchMarkdownContent = async (file) => {
  const response = await fetch(file);
  return response.text();
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('');

  const { data: heroContent, isLoading } = useQuery({
    queryKey: ['heroContent'],
    queryFn: () => fetchMarkdownContent('/content/Hero.md'),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -200px 0px" }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [heroContent]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-[#FFF5E1]">
      <Loader />
    </div>;
  }

  function smoothScroll(to) {
    document.querySelector(`#${to}`).scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <div className="min-h-screen bg-[#FFF5E1] text-[#1E3D59]">
      <NavBar onSmoothScroll={smoothScroll} activeSection={activeSection} />

      <main className="pt-40 container mx-auto px-4 py-12">
        <Hero content={heroContent} onSmoothScroll={smoothScroll} />
        <Info content={heroContent} />
        <Schedule />
        <Participants />
        <PastEditions />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
