import { useState, useEffect, useRef } from 'react';
import { extractMetaData, extractParticipants, extractGalleryItems } from './utils';

export const useMarkdownProcessor = (markdownData) => {
  const [markdownContents, setMarkdownContents] = useState({});
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    if (markdownData) {
      const newMetaData = {};
      const newMarkdownContents = {};
      for (const [key, content] of Object.entries(markdownData)) {
        const [rawMeta, metaData] = extractMetaData(content);
        newMetaData[key] = metaData;
        newMarkdownContents[key] = content.replace(rawMeta, "").trim();
        
        if (key === 'Gallery') {
          const galleryItems = extractGalleryItems(newMarkdownContents[key]);
          newMetaData[key] = { ...newMetaData[key], gallery: galleryItems };
        }

        if (key === 'Participants') {
          const participants = extractParticipants(newMarkdownContents[key]);
          newMetaData[key] = { ...newMetaData[key], participants };
        }
      }
      
      setMetaData(newMetaData);
      setMarkdownContents(newMarkdownContents);
    }
  }, [markdownData]);

  return { markdownContents, metaData };
};

export const useActiveSection = (sectionRefs) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10% 0px -70% 0px" }
    );

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  return activeSection;
};
