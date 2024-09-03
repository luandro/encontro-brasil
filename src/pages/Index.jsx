import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';

const fetchMarkdownContent = async (file) => {
  const response = await fetch(file);
  return response.text();
};

const Index = () => {
  const { data: eventoInfo, isLoading: isLoadingEventoInfo } = useQuery({
    queryKey: ['eventoInfo'],
    queryFn: () => fetchMarkdownContent('/src/content/evento-info.md'),
  });

  const { data: cronograma, isLoading: isLoadingCronograma } = useQuery({
    queryKey: ['cronograma'],
    queryFn: () => fetchMarkdownContent('/src/content/cronograma.md'),
  });

  if (isLoadingEventoInfo || isLoadingCronograma) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  const cronogramaItems = cronograma.split('\n## ').slice(1);

  return (
    <div className="min-h-screen bg-[#1E1E24] text-[#C4AF9A]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
      >
        <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-6xl font-bold mb-4 text-[#FB9F89]">Evento de Defesa Territorial</h1>
          <h2 className="text-4xl font-semibold mb-2 text-[#C4AF9A]">Aldeia Galheiro Novo</h2>
          <p className="text-2xl text-[#81AE9D]">16 a 23 de setembro de 2024</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-16 bg-[#81AE9D] text-[#1E1E24]">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Informações do Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactMarkdown className="prose prose-lg prose-invert max-w-none">
                {eventoInfo}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-[#21A179] text-[#1E1E24] p-8">
            <CardHeader>
              <CardTitle className="text-5xl font-bold mb-8 text-center text-[#FB9F89]">Cronograma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cronogramaItems.map((day, index) => {
                  const [title, ...content] = day.split('\n');
                  const dayNumber = title.match(/\d+/)[0];
                  return (
                    <div key={index} className="bg-[#C4AF9A] p-6 rounded-lg shadow-lg">
                      <h3 className="text-6xl font-bold mb-4 text-[#FB9F89]">{dayNumber}</h3>
                      <h4 className="text-2xl font-semibold mb-4 text-[#1E1E24]">{title}</h4>
                      <ReactMarkdown className="prose prose-sm max-w-none text-[#1E1E24]">
                        {content.join('\n')}
                      </ReactMarkdown>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer className="bg-[#1E1E24] text-[#C4AF9A] py-8 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Evento de Defesa Territorial. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;