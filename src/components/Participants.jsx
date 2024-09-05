import React from 'react';

const parseParticipantsData = (participantsData) => {
  return participantsData.reduce((acc, participant) => {
    const lines = participant.content.split('\n');
    const logoUrl = lines.find(line => line.startsWith('!['))?.match(/\((.*?)\)/)?.[1] || '';
    
    const parsedParticipants = lines
      .filter(line => line.startsWith('### '))
      .map(line => {
        const name = line.replace('### ', '').trim();
        const description = lines[lines.indexOf(line) + 1]?.trim() || '';
        return { name, description };
      });

    acc.push({
      name: participant.name,
      logo: logoUrl,
      participants: parsedParticipants
    });

    return acc;
  }, []);
};

const Participants = ({ participantsData, title }) => {
  const organizations = parseParticipantsData(participantsData);

  return (
    <section id="participants" className="my-12 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
      {organizations.map((org) => (
        <div key={org.name} className="mb-12">
          <div className="flex flex-col items-center justify-center mb-8">
            {org.logo && (
              <img src={org.logo} alt={`Logo ${org.name}`} className="w-72 h-52 object-contain mb-4" />
            )}
            <h3 className="text-2xl font-bold text-center">{org.name}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {org.participants.map((participant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{participant.name}</h4>
                  <p className="text-gray-600">{participant.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Participants;
