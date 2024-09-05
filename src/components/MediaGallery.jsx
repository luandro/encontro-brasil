import React from 'react';

const MediaGallery = ({ markdown, metaData }) => {
  const galleryItems = metaData?.gallery || [];

  return (
    <section id="gallery" className="py-16 bg-[#F5E6D3]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">{metaData.title}</h2>
        <p className="text-xl mb-12 text-center">{metaData.subtitle}</p>
        
        {galleryItems.length > 0 ? (
          <div className="space-y-12">
            {galleryItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
                <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-t pt-4">
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  ))}
                </div>
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

export default MediaGallery;
