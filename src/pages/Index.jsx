import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Evento de Defesa Territorial - Aldeia Galheiro Novo</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Informações do Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: eventoInfo }} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cronograma</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {cronograma.split('\n## ').map((day, index) => {
              if (index === 0) return null; // Skip the title
              const [title, ...content] = day.split('\n');
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6">
                      {content.map((item, i) => (
                        <li key={i}>{item.trim()}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;