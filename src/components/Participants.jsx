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
        currentParticipant = { name: line.replace('### ', '').trim(), description: '' };
      } else if (line.trim()) {
        const [key, value] = line.split(':').map(part => part.trim());
        if (key && value) {
          currentParticipant[key.toLowerCase()] = value;
        } else {
          currentParticipant.description = (currentParticipant.description || '') + line.trim() + ' ';
        }
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

const Participants = ({ participantsData, title  }) => {
  const organizations = parseParticipantsData(participantsData);

  return (
    <section id="participants" className="my-12 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
      {organizations.map((org) => (
        <div key={org.name} className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <img src={org.logo} alt={`Logo ${org.name}`} className="w-72 h-52 object-contain mr-6" />
            {/* <h3 className="text-3xl font-bold">{org.name}</h3> */}
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
