import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const MediaGallery = ({ markdown, metaData }) => {
  const galleryItems = metaData?.gallery || [];
  const [currentItem, setCurrentItem] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const openDialog = useCallback((item, sectionIndex, itemIndex) => {
    setCurrentItem(item);
    setCurrentSectionIndex(sectionIndex);
    setCurrentItemIndex(itemIndex);
  }, []);

  const closeDialog = useCallback(() => {
    setCurrentItem(null);
    setCurrentSectionIndex(0);
    setCurrentItemIndex(0);
  }, []);

  const navigateGallery = useCallback((direction) => {
    const currentSection = galleryItems[currentSectionIndex];
    if (!currentSection) return;

    const newItemIndex = direction === 'next'
      ? (currentItemIndex + 1) % currentSection.items.length
      : (currentItemIndex - 1 + currentSection.items.length) % currentSection.items.length;

    setCurrentItemIndex(newItemIndex);
    setCurrentItem(currentSection.items[newItemIndex]);
  }, [currentSectionIndex, currentItemIndex, galleryItems]);

  return (
    <section id="gallery" className="py-16 bg-[#F5E6D3]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">{metaData.title || "Galeria"}</h2>
        
        {galleryItems.length > 0 ? (
          <div className="space-y-16">
            {galleryItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <p className="text-xl mb-12 text-center">{section.title}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item, itemIndex) => (
                    <div onClick={() => openDialog(item, sectionIndex, itemIndex)} key={itemIndex} className="cursor-pointer bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-w-16 aspect-h-9">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                        ) : item.video ? (
                          <iframe src={item.video} title={item.title} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        ) : null}
                      </div>
                      <div className="p-4">
                        <h4 className="text-caption mb-2">{item.title}</h4>
                      </div>
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

      <Dialog open={!!currentItem} onOpenChange={closeDialog}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 overflow-hidden bg-[#F5E6D3]">
          <DialogTitle className="sr-only">{currentItem?.title}</DialogTitle>
          <div className="relative w-full h-full flex flex-col">
            <Button 
              onClick={closeDialog} 
              className="absolute top-4 right-4 z-10 bg-[#F5E6D3] text-black hover:bg-[#E6D7C4]"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex-grow flex items-center justify-center p-4">
              {currentItem?.image ? (
                <img src={currentItem.image} alt={currentItem.title} className="max-w-full max-h-full object-contain" />
              ) : currentItem?.video ? (
                <iframe src={currentItem.video} title={currentItem.title} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              ) : null}
            </div>
            <div className="bg-[#F5E6D3] p-4 flex flex-col sm:flex-row justify-between items-center">
              <h3 className="text-caption text-black mb-2 sm:mb-0">{currentItem?.title}</h3>
              <div className="flex space-x-4">
                <Button onClick={() => navigateGallery('prev')} variant="outline" className="bg-white text-black hover:bg-gray-100">
                  <ChevronLeft className="mr-2" /> Anterior
                </Button>
                <Button onClick={() => navigateGallery('next')} variant="outline" className="bg-white text-black hover:bg-gray-100">
                  Próximo <ChevronRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MediaGallery;
