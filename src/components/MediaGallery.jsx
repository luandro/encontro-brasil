import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
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
                <h3 className="text-3xl font-bold mb-6 text-center">{section.title}</h3>
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
        <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">{currentItem?.title}</DialogTitle>
          <div className="p-6">
            <div className="mb-4 w-full h-[60vh]">
              {currentItem?.image ? (
                <img src={currentItem.image} alt={currentItem.title} className="object-contain w-full h-full" />
              ) : currentItem?.video ? (
                <iframe src={currentItem.video} title={currentItem.title} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              ) : null}
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-caption">{currentItem?.title}</h3>
            </div>
          </div>
          <div className="flex justify-between p-4 bg-gray-100">
            <Button onClick={() => navigateGallery('prev')} variant="outline"><ChevronLeft className="mr-2" /> Anterior</Button>
            <Button onClick={() => navigateGallery('next')} variant="outline">Próximo <ChevronRight className="ml-2" /></Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MediaGallery;
