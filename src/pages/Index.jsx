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
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  const cronogramaItems = cronograma.split('\n## ').slice(1);

  return (
    <div className="min-h-screen bg-[#1E1E24] text-[#C4AF9A]">
      <header className="bg-[#21A179] py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FB9F89]">Evento de Defesa Territorial</h1>
          <div className="space-x-4">
            <Button variant="ghost" className="text-[#C4AF9A] hover:text-[#FB9F89]">Sobre</Button>
            <Button variant="ghost" className="text-[#C4AF9A] hover:text-[#FB9F89]">Cronograma</Button>
            <Button variant="ghost" className="text-[#C4AF9A] hover:text-[#FB9F89]">Contato</Button>
          </div>
        </nav>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
      >
        <div className="text-center bg-black bg-opacity-50 p-12 rounded-lg">
          <h1 className="text-7xl font-bold mb-6 text-[#FB9F89]">Evento de Defesa Territorial</h1>
          <h2 className="text-5xl font-semibold mb-4 text-[#C4AF9A]">Aldeia Galheiro Novo</h2>
          <p className="text-3xl text-[#81AE9D] mb-8">16 a 23 de setembro de 2024</p>
          <Button className="bg-[#FB9F89] text-[#1E1E24] hover:bg-[#C4AF9A] text-xl py-3 px-8">Saiba Mais</Button>
        </div>
      </motion.div>

      <section className="py-20 bg-[#81AE9D]">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-12 text-center text-[#1E1E24]">Informações do Evento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#C4AF9A] p-8 rounded-lg shadow-lg text-center"
            >
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-[#FB9F89]" />
              <h3 className="text-2xl font-semibold mb-2 text-[#1E1E24]">Data</h3>
              <p className="text-[#1E1E24]">16 a 23 de setembro de 2024</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#C4AF9A] p-8 rounded-lg shadow-lg text-center"
            >
              <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-[#FB9F89]" />
              <h3 className="text-2xl font-semibold mb-2 text-[#1E1E24]">Local</h3>
              <p className="text-[#1E1E24]">Aldeia Galheiro Novo, Tocantins, Brasil</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#C4AF9A] p-8 rounded-lg shadow-lg text-center"
            >
              <UsersIcon className="w-16 h-16 mx-auto mb-4 text-[#FB9F89]" />
              <h3 className="text-2xl font-semibold mb-2 text-[#1E1E24]">Participantes</h3>
              <p className="text-[#1E1E24]">71 participantes de diversas comunidades</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#21A179]">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-12 text-center text-[#FB9F89]">Cronograma</h2>
          <Accordion type="single" collapsible className="w-full">
            {cronogramaItems.map((day, index) => {
              const [title, ...content] = day.split('\n');
              return (
                <AccordionItem key={index} value={`item-${index}`} className="mb-4">
                  <AccordionTrigger className="text-2xl font-semibold bg-[#C4AF9A] p-4 rounded-t-lg text-[#1E1E24]">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#81AE9D] p-6 rounded-b-lg text-[#1E1E24]">
                    <ReactMarkdown className="prose prose-lg max-w-none">
                      {content.join('\n')}
                    </ReactMarkdown>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      <footer className="bg-[#1E1E24] text-[#C4AF9A] py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-[#FB9F89]">Entre em Contato</h3>
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