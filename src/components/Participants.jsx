import React from 'react';
import ReactMarkdown from 'react-markdown';

const Participants = ({ participantsData }) => {
  const groupedParticipants = participantsData.reduce((acc, participant) => {
    const [organization, logo, ...rest] = participant.split('\n');
    const orgName = organization.replace('## ', '').trim();
    if (!acc[orgName]) {
      acc[orgName] = { logo: logo.replace('![Logo ', '').replace(']', ''), participants: [] };
    }
    acc[orgName].participants.push(rest.join('\n'));
    return acc;
  }, {});

  return (
    <section id="participants" className="my-12 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">Participantes</h2>
      {Object.entries(groupedParticipants).map(([org, { logo, participants }]) => (
        <div key={org} className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt={`Logo ${org}`} className="w-20 h-20 object-contain mr-4" />
            <h3 className="text-2xl font-bold">{org}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {participants.map((participant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-24 bg-gray-100 flex items-center justify-center">
                  <img src={logo} alt={`Logo ${org}`} className="h-16 object-contain" />
                </div>
                <div className="p-6">
                  <ReactMarkdown className="prose">{participant}</ReactMarkdown>
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
