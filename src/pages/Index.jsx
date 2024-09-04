import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import NavBar from '@/components/NavBar';

const fetchMarkdownContent = async (file) => {
  const response = await fetch(file);
  return response.text();
};

const extractMetaData = (text) => {
  const metaRegex = /^---\n([\s\S]*?)\n---/;
  const match = text.match(metaRegex);
  if (!match) return [null, {}];
  const rawMeta = match[0];
  const metaText = match[1];
  const metaData = {};
  metaText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':').map(part => part.trim());
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      if (value.startsWith('-')) {
        // It's an array
        metaData[key] = value.split('-').slice(1).map(item => item.trim());
      } else {
        metaData[key] = value;
      }
    }
  });
  return [rawMeta, metaData];
};

const Index = () => {
  const [eventoInfoMarkdown, setEventoInfoMarkdown] = useState("");
  const [eventoInfoMetaData, setEventoInfoMetaData] = useState({});
  const [cronogramaMarkdown, setCronogramaMarkdown] = useState("");
  const [cronogramaMetaData, setCronogramaMetaData] = useState({});

  const { data: eventoInfo, isLoading: isLoadingEventoInfo } = useQuery({
    queryKey: ['eventoInfo'],
    queryFn: () => fetchMarkdownContent('/evento-info.md'),
  });

  const { data: cronograma, isLoading: isLoadingCronograma } = useQuery({
    queryKey: ['cronograma'],
    queryFn: () => fetchMarkdownContent('/cronograma.md'),
  });
  useEffect(() => {
    if (eventoInfo) {
      const [rawMeta, metaData] = extractMetaData(eventoInfo);
      setEventoInfoMetaData(metaData);
      setEventoInfoMarkdown(eventoInfo.replace(rawMeta, ""));
    }
  }, [eventoInfo]);

  useEffect(() => {
    if (cronograma) {
      const [rawMeta, metaData] = extractMetaData(cronograma);
      setCronogramaMetaData(metaData);
      setCronogramaMarkdown(cronograma.replace(rawMeta, ""));
    }
  }, [cronograma]);

  if (isLoadingEventoInfo || isLoadingCronograma) {
    return <div className="flex justify-center items-center h-screen bg-[#FFF5E1]">Carregando...</div>;
  }

  function smoothScroll (to) {
    document.querySelector(`#${to}`).scrollIntoView({
      behavior: 'smooth'
    });
  }

  const cronogramaItems = cronogramaMarkdown.split('\n## ').slice(1);
  console.log(eventoInfoMetaData)
  return (
    <div className="min-h-screen bg-[#FFF5E1] text-[#1E3D59]">
      <NavBar onSmoothScroll={smoothScroll} />

      <main className="pt-40 container mx-auto px-4 py-12">
        <section className="mb-20">
          <h2 className="text-6xl font-bold mb-8 text-center text-[#FF6E40]">
            {eventoInfoMetaData.title_2}
          </h2>
          <h2 className="text-6xl font-semibold mb-6 text-center text-[#1E3D59]">
            {eventoInfoMetaData.title}
          </h2>
          <p className="text-2xl text-center mb-12">
            {eventoInfoMetaData.subTitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <img src="/kaaiwar.png" alt="Logo Kaaiwar" className="w-full h-40 object-contain" />
            <img src="/logo_guardioes_caru.png" alt="Logo Guardiões da Floresta Caru" className="w-full h-48 object-contain" />
            <img src="/logo_guerreiras.png" alt="Logo Guerreiras da Floresta" className="w-full h-48 object-contain" />
            <img src="/logo_kraho.png" alt="Logo Krahô" className="w-full h-48 object-contain" />
          </div>
          <p className="text-2xl text-center mb-12">
            {eventoInfoMetaData.subTitle2}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 items-center justify-items-center">
            <img src="/logo_funai.png" alt="Logo FUNAI" className="w-full h-40 object-contain mx-auto" />
            <img src="/logo_cti.png" alt="Logo CTI" className="w-full h-40 object-contain mx-auto" />
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-[#FF6E40] text-[#FFF5E1] hover:bg-[#1E3D59] text-xl py-3 px-8"
              onClick={() => smoothScroll('cronograma')}
            >
              Cronograma
            </Button>
          </div>
        </section>

        <section className="mb-20">
          <h2 id="informacoes" className="text-5xl font-bold mb-12 text-center text-[#FF6E40]">Informações do Evento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
            >
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
              <h3 className="mb-8 text-2xl font-semibold text-[#1E3D59]">Data</h3>
              <div className="flex flex-col items-center justify-start h-full uppercase">
                {eventoInfoMetaData?.data?.split(/\s+(?=de\s)/).map((part, index) => {
                  const styles = {
                    0: { color: '#FF6E40', size: 'text-4xl', weight: 'font-bold' },
                    1: { color: '#81ae9d', size: 'text-5xl', weight: 'font-semibold' },
                    default: { color: '#21a179', size: 'text-6xl', weight: 'font-semibold' },
                    connector: { color: '#FFFFFF', size: 'text-3xl', weight: 'font-normal' }
                  };

                  const words = part.split(' ');
                  const isConnector = words[0].toLowerCase() === 'de';

                  return (
                    <p key={index} className={`${styles[index]?.size || styles.default.size} ${styles[index]?.weight || styles.default.weight} mb-2`}>
                      {words.map((word, wordIndex) => {
                        const { color, size, weight } = isConnector && wordIndex === 0
                          ? styles.connector
                          : styles[index] || styles.default;

                        const capitalizedWord = index === 0 || (index === 1 && wordIndex === 0)
                          ? word.charAt(0).toUpperCase() + word.slice(1)
                          : word;

                        return (
                          <span key={wordIndex} style={{ color }} className="mr-2">
                            {capitalizedWord}
                          </span>
                        );
                      })}
                    </p>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
            >
              <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
              <h3 className="text-2xl font-semibold mb-2 text-[#1E3D59]">Local</h3>
              <div className="flex justify-center mb-4">
                <img
                  src={`/${eventoInfoMetaData.localMedia}`}
                  alt="Local do Evento"
                  className="w-48 h-48 object-cover rounded-full shadow-lg"
                />
              </div>
              <p className="text-[#1E3D59]">{eventoInfoMetaData.local}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
            >
              <UsersIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
              <h3 className="text-2xl font-semibold mb-2 text-[#1E3D59]">Organizadores</h3>
              <div className="text-[#1E3D59]">
                <ReactMarkdown className="prose prose-lg max-w-none text-[#1E3D59]">
                  {eventoInfoMarkdown}
                </ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="mb-20">
          <h2 id="cronograma" className="text-5xl font-bold mb-12 text-center text-[#FF6E40]">Cronograma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cronogramaItems.map((day, index) => {
              const [title, ...content] = day.split('\n');
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#FFC13B] rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="bg-[#FF6E40] p-4">
                    <h3 className="text-2xl font-bold text-[#FFF5E1]">{title}</h3>
                  </div>
                  <div className="p-6">
                    <ReactMarkdown className="prose prose-lg max-w-none text-[#1E3D59]">
                      {content.join('\n')}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="bg-[#1E3D59] text-[#FFF5E1] py-4">
        <div className="container mx-auto px-4 text-center">
          <p>
            Por <a href="https://awana.digital" className="text-[#FF6E40] hover:underline">Awana Digital</a> 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
