import React, { useState, useEffect, useCallback } from 'react';
import Modal from './Modal';

const PastEditions = ({ markdown, metaData }) => {
  const [modalContent, setModalContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryItems = metaData?.gallery?.filter(i => i.type !== 'title') || [];

  const openModal = useCallback((item) => {
    const index = galleryItems.findIndex(i => i === item);
    setCurrentIndex(index);
    setModalContent(item);
  }, [galleryItems]);

  const closeModal = useCallback(() => {
    setModalContent(null);
  }, []);

  const navigate = useCallback((direction) => {
    const newIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    setCurrentIndex(newIndex);
    setModalContent(galleryItems[newIndex]);
  }, [currentIndex, galleryItems]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (modalContent) {
        if (event.key === 'ArrowLeft') navigate(-1);
        if (event.key === 'ArrowRight') navigate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalContent, navigate]);

  return (
    <section id="edicoes-anteriores" className="py-16 bg-[#F5E6D3]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">{metaData.title}</h2>
        <p className="text-xl mb-12 text-center">{metaData.subtitle}</p>
        
        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                onClick={() => openModal(item)}
              >
                {item.type === 'image' && (
                  <>
                    <img src={item.src} alt={item.alt} className="w-full h-64 object-cover" />
                    <p className="p-4 text-sm text-gray-600">{item.alt}</p>
                  </>
                )}
                {item.type === 'video' && (
                  <>
                    <div className="relative">
                      <img src={`https://img.youtube.com/vi/${item.src.split('/').pop()}/0.jpg`} alt={item.title} className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white opacity-75" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l8-5-8-5z" />
                        </svg>
                      </div>
                    </div>
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

      <Modal isOpen={modalContent !== null} onClose={closeModal}>
        <div className="relative">
          {modalContent && modalContent.type === 'image' && (
            <img src={modalContent.src} alt={modalContent.alt} className="max-w-full max-h-[80vh]" />
          )}
          {modalContent && modalContent.type === 'video' && (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`${modalContent.src}?autoplay=1`}
                title={modalContent.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          )}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 text-gray-800 hover:bg-opacity-75"
          >
            &#8592;
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 text-gray-800 hover:bg-opacity-75"
          >
            &#8594;
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default PastEditions;
