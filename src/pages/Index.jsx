import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

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
    return <div className="flex justify-center items-center h-screen bg-[#FFF5E1]">Carregando...</div>;
  }

  const cronogramaItems = cronograma.split('\n## ').slice(1);

  return (
    <div className="min-h-screen bg-[#FFF5E1] text-[#1E3D59]">
      <header className="bg-[#FF6E40] py-6">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#FFF5E1]">Evento de Defesa Territorial</h1>
          <div className="space-x-4">
            <Button variant="ghost" className="text-[#FFF5E1] hover:text-[#1E3D59] text-lg">Sobre</Button>
            <Button variant="ghost" className="text-[#FFF5E1] hover:text-[#1E3D59] text-lg">Cronograma</Button>
            <Button variant="ghost" className="text-[#FFF5E1] hover:text-[#1E3D59] text-lg">Contato</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <h2 className="text-6xl font-bold mb-8 text-center text-[#FF6E40]">Evento de Defesa Territorial</h2>
          <h3 className="text-4xl font-semibold mb-6 text-center text-[#1E3D59]">Aldeia Galheiro Novo</h3>
          <p className="text-2xl text-center mb-12">16 a 23 de setembro de 2024</p>
          <div className="flex justify-center">
            <Button className="bg-[#FF6E40] text-[#FFF5E1] hover:bg-[#1E3D59] text-xl py-3 px-8">Saiba Mais</Button>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center text-[#FF6E40]">Informações do Evento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
            >
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
              <h3 className="text-2xl font-semibold mb-2 text-[#1E3D59]">Data</h3>
              <p className="text-[#1E3D59]">16 a 23 de setembro de 2024</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
            >
              <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
              <h3 className="text-2xl font-semibold mb-2 text-[#1E3D59]">Local</h3>
              <p className="text-[#1E3D59]">Aldeia Galheiro Novo, Tocantins, Brasil</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
            >
              <UsersIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
              <h3 className="text-2xl font-semibold mb-2 text-[#1E3D59]">Participantes</h3>
              <p className="text-[#1E3D59]">71 participantes de diversas comunidades</p>
            </motion.div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center text-[#FF6E40]">Cronograma</h2>
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

      <footer className="bg-[#1E3D59] text-[#FFF5E1] py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-[#FF6E40]">Entre em Contato</h3>
          <p className="mb-4">Para mais informações, entre em contato conosco:</p>
          <p className="mb-2">Email: info@eventodefesaterritorial.com</p>
          <p>Telefone: (00) 1234-5678</p>
          <p className="mt-8">&copy; 2024 Evento de Defesa Territorial. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;