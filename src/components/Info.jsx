import React from 'react';
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

const Info = ({ data, local, localMedia, markdown }) => {
  return (
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
            {data?.split(/\s+(?=de\s)/).map((part, index) => {
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
              src={`/${localMedia}`}
              alt="Local do Evento"
              className="w-48 h-48 object-cover rounded-full shadow-lg"
            />
          </div>
          <p className="text-[#1E3D59]">{local}</p>
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
              {markdown}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Info;
