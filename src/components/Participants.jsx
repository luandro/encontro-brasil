import React from 'react';
import ReactMarkdown from 'react-markdown';

const parseParticipantsData = (markdownContent) => {
  const lines = markdownContent.split('\n');
  const title = lines.find(line => line.startsWith('# '))?.replace('# ', '').trim();
  const sections = markdownContent.split('\n## ').slice(1);
  return {
    title,
    organizations: sections.map(section => {
      const [name, ...content] = section.split('\n');
      const logoMatch = content.find(line => line.startsWith('!['));
      const logoUrl = logoMatch ? logoMatch.match(/\((.*?)\)/)[1] : '';
      
      const participants = content
        .filter(line => line.startsWith('### '))
        .map(line => {
          const participantName = line.replace('### ', '').trim();
          const participantIndex = content.indexOf(line);
          let description = '';
          for (let i = participantIndex + 1; i < content.length; i++) {
            if (content[i].startsWith('### ') || content[i].startsWith('## ')) {
              break;
            }
            description += content[i].trim() + '\n';
          }
          return { name: participantName, description: description.trim() };
        });

      return {
        name: name.trim(),
        logo: logoUrl,
        participants
      };
    })
  };
};

const Participants = ({ markdownContent }) => {
  const { title, organizations } = parseParticipantsData(markdownContent);

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
                  <ReactMarkdown>{participant.description}</ReactMarkdown>
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
