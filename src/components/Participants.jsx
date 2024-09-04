import React from 'react';

const parseParticipantsData = (participantsData) => {
  return participantsData.reduce((acc, participant) => {
    const lines = participant.split('\n');
    const orgName = lines[0].replace('## ', '').trim();
    const logoUrl = lines[1].match(/\((.*?)\)/)[1];
    
    const participantInfo = lines.slice(2);
    const parsedParticipants = [];

    let currentParticipant = {};
    participantInfo.forEach(line => {
      if (line.startsWith('### ')) {
        if (Object.keys(currentParticipant).length > 0) {
          parsedParticipants.push(currentParticipant);
        }
        currentParticipant = { name: line.replace('### ', '').trim() };
      } else if (line.startsWith('- ')) {
        const [key, value] = line.replace('- ', '').split(': ');
        currentParticipant[key.trim().toLowerCase()] = value.trim();
      }
    });

    if (Object.keys(currentParticipant).length > 0) {
      parsedParticipants.push(currentParticipant);
    }

    const existingOrg = acc.find(org => org.name === orgName);
    if (existingOrg) {
      existingOrg.participants.push(...parsedParticipants);
    } else {
      acc.push({
        name: orgName,
        logo: logoUrl,
        participants: parsedParticipants
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
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{participant.name}</h4>
                  {Object.entries(participant).map(([key, value]) => {
                    if (key !== 'name') {
                      return (
                        <p key={key} className="mb-1">
                          <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
                        </p>
                      );
                    }
                    return null;
                  })}
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
