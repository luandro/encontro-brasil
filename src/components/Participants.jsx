import React from 'react';
import ReactMarkdown from 'react-markdown';

const Participants = ({ participantsData }) => {
  return (
    <section id="participants" className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Participantes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {participantsData.map((participant, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <ReactMarkdown>{participant}</ReactMarkdown>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Participants;
