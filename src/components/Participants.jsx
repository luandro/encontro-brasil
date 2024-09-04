import React from 'react';
import ReactMarkdown from 'react-markdown';

const Participants = ({ participantsData }) => {
  const groupedParticipants = participantsData.reduce((acc, participant) => {
    const [organization, ...rest] = participant.split('\n');
    const orgName = organization.replace('## ', '').trim();
    if (!acc[orgName]) {
      acc[orgName] = [];
    }
    acc[orgName].push(rest.join('\n'));
    return acc;
  }, {});

  return (
    <section id="participants" className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Participantes</h2>
      {Object.entries(groupedParticipants).map(([org, participants]) => (
        <div key={org} className="mb-8">
          <h3 className="text-2xl font-bold mb-4">{org}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participants.map((participant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <ReactMarkdown>{participant}</ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Participants;
