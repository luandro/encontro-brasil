import React from 'react';
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

const Info = ({ content }) => {
  const sections = content ? content.split('### ').slice(1) : [];

  const localSection = sections.find(section => section.startsWith('Local'));
  const dateSection = sections.find(section => section.startsWith('Data'));
  const organizationSection = sections.find(section => section.startsWith('Organization'));

  const localContent = localSection?.split('\n').slice(1).join('\n').trim();
  const dateContent = dateSection?.split('\n').slice(1).join('\n').trim();
  const organizationContent = organizationSection?.split('\n').slice(1).join('\n').trim();

  const localImage = localContent?.match(/!\[.*?\]\((.*?)\)/)?.[1];
  const localText = localContent?.replace(/!\[.*?\]\(.*?\)/, '').trim();

  return (
    <section id="informacoes" className="mb-20">
      <h2 className="text-5xl font-bold mb-12 text-center text-[#FF6E40]">Informações do Evento</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {dateContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#FFC13B] p-8 rounded-lg shadow-lg text-center"
          >
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-[#1E3D59]" />
            <h3 className="mb-8 text-2xl font-semibold text-[#1E3D59]">Data</h3>
            <div className="flex flex-col items-stretch justify-start h-full">
              {dateContent.split('de').map((line, index, array) => (
                <div key={index} className="mb-4 last:mb-0 w-full">
                  <div className="bg-[#1E3D59] text-[#FFC13B] py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 uppercase font-semibold table table-fixed w-full">
                    <span className="table-cell text-center">
                      {index === array.length - 1 ? 'de ' + line : line}
                    </span>
                  </div>
                </div>
              ))}
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
