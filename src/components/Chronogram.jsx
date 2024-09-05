import React from 'react';
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';

const Chronogram = ({ title, cronogramaItems }) => {
  return (
    <section className="mb-20">
      <h2 id="cronograma" className="text-5xl font-bold mb-12 text-center text-[#FF6E40]">{title}</h2>
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
  );
};

export default Chronogram;
