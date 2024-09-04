import React from 'react';

const PastEditions = ({ markdown, metaData }) => {
  return (
    <section id="edicoes-anteriores" className="py-16 bg-[#F5E6D3]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">{metaData.title}</h2>
        <p className="text-xl mb-12 text-center">{metaData.subtitle}</p>
        
        {metaData.gallery && metaData.gallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metaData.gallery.filter(i => i.type !== 'title').map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {item.type === 'image' && (
                  <>
                    <img src={item.src} alt={item.alt} className="w-full h-64 object-cover" />
                    <p className="p-4 text-sm text-gray-600">{item.alt}</p>
                  </>
                )}
                {item.type === 'video' && (
                  <>
                    <iframe
                      width="100%"
                      height="250"
                      src={item.src}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                    ></iframe>
                    <p className="p-4 text-sm text-gray-600">{item.title}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">Nenhum item de galeria disponível.</p>
        )}
      </div>
    </section>
  );
};

export default PastEditions;
