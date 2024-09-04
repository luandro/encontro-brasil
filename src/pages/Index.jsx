import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Info from '@/components/Info';

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
        <Hero
          title={eventoInfoMetaData.title}
          title2={eventoInfoMetaData.title_2}
          subTitle={eventoInfoMetaData.subTitle}
          subTitle2={eventoInfoMetaData.subTitle2}
          onSmoothScroll={smoothScroll}
        />
        <Info
          data={eventoInfoMetaData.data}
          local={eventoInfoMetaData.local}
          localMedia={eventoInfoMetaData.localMedia}
          markdown={eventoInfoMarkdown}
        />
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
