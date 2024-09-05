import React from 'react';
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

const Info = ({ content }) => {
  console.log('Info component - content:', content);

  const sections = content ? content.split('### ').slice(1) : [];
  console.log('Info component - sections:', sections);

  const localSection = sections.find(section => section.startsWith('Local'));
  const dataSection = sections.find(section => section.startsWith('Data'));
  const organizationSection = sections.find(section => section.startsWith('Organization'));

  console.log('Info component - localSection:', localSection);
  console.log('Info component - dataSection:', dataSection);
  console.log('Info component - organizationSection:', organizationSection);

  const localContent = localSection?.split('\n').slice(1).join('\n').trim();
  const dataContent = dataSection?.split('\n').slice(1).join('\n').trim();
  const organizationContent = organizationSection?.split('\n').slice(1).join('\n').trim();

  console.log('Info component - localContent:', localContent);
  console.log('Info component - dataContent:', dataContent);
  console.log('Info component - organizationContent:', organizationContent);

  const localImage = localContent?.match(/!\[.*?\]\((.*?)\)/)?.[1];
  const localText = localContent?.replace(/!\[.*?\]\(.*?\)/, '').trim();

  console.log('Info component - localImage:', localImage);
  console.log('Info component - localText:', localText);

  return (
    <section id="informacoes" className="mb-20">
      <h2 className="text-5xl font-bold mb-12 text-center text-[#FF6E40]">Informações do Evento</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {dataContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
          >
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
            <h3 className="mb-8 text-2xl font-semibold text-[#1E3D59]">Data</h3>
            <div className="flex flex-col items-center justify-start h-full uppercase">
              <ReactMarkdown className="prose prose-lg max-w-none text-[#1E3D59]">
                {dataContent}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
        {localContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
          >
            <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
            <h3 className="text-2xl font-semibold mb-2 text-[#1E3D59]">Local</h3>
            {localImage && (
              <div className="flex justify-center mb-4">
                <img
                  src={localImage}
                  alt="Local do Evento"
                  className="w-48 h-48 object-cover rounded-full shadow-lg"
                />
              </div>
            )}
            <p className="text-[#1E3D59]">{localText}</p>
          </motion.div>
        )}
        {organizationContent && (
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
                {organizationContent}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Info;
