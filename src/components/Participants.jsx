import React from 'react';
import ReactMarkdown from 'react-markdown';

const parseParticipantsData = (participantsData) => {
  return participantsData.reduce((acc, participant) => {
    const lines = participant.split('\n');
    const orgName = lines[0].replace('## ', '').trim();
    const logoUrl = lines[1].match(/\((.*?)\)/)[1];
    
    const participantInfo = lines.slice(2).join('\n').trim();

    const existingOrg = acc.find(org => org.name === orgName);
    if (existingOrg) {
      existingOrg.participants.push(participantInfo);
    } else {
      acc.push({
        name: orgName,
        logo: logoUrl,
        participants: [participantInfo]
      });
    }

    return acc;
  }, []);
};

const Participants = ({ participantsData }) => {
  const organizations = parseParticipantsData(participantsData);

  return (
    <section id="participants" className="my-12 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">Participantes</h2>
      {organizations.map((org) => (
        <div key={org.name} className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src={org.logo} alt={`Logo ${org.name}`} className="w-20 h-20 object-contain mr-4" />
            <h3 className="text-2xl font-bold">{org.name}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {org.participants.map((participant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-24 bg-gray-100 flex items-center justify-center">
                  <img src={org.logo} alt={`Logo ${org.name}`} className="h-16 object-contain" />
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
