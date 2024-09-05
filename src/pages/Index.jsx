import React, { useRef } from 'react';
import Loader from '@/components/Loader';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Info from '@/components/Info';
import Schedule from '@/components/Schedule';
import Participants from '@/components/Participants';
import PastEditions from '@/components/PastEditions';
import Footer from '@/components/Footer';
import { useNotionBlocks, useMarkdownData } from '@/lib/api';
import { useMarkdownProcessor, useActiveSection } from '@/lib/hooks';
import { smoothScroll } from '@/lib/utils';

const Index = () => {
  const sectionRefs = {
    informacoes: useRef(null),
    schedule: useRef(null),
    participants: useRef(null),
    'edicoes-anteriores': useRef(null),
  };

  const { data: notionBlocks, isLoading: isLoadingNotionBlocks } = useNotionBlocks();
  const { data: markdownData, isLoading: isLoadingMarkdown } = useMarkdownData(notionBlocks);
  const { markdownContents, metaData } = useMarkdownProcessor(markdownData);
  const activeSection = useActiveSection(sectionRefs);

  if (isLoadingNotionBlocks || isLoadingMarkdown) {
    return <div className="flex justify-center items-center h-screen bg-[#FFF5E1]">
      <Loader />
    </div>;
  }

  const scheduleTitle = markdownContents['Event Schedule']?.split('\n').find(line => line.startsWith('#'))?.replace(/^#+\s*/, '').trim();
  const scheduleItems = markdownContents['Event Schedule']?.split('\n\n**').slice(1).map(item => `**${item}`);

  return (
    <div className="min-h-screen bg-[#FFF5E1] text-[#1E3D59]">
      <NavBar onSmoothScroll={smoothScroll} activeSection={activeSection} />

      <main className="pt-40 container mx-auto px-4 py-12">
        <Hero
          title={metaData['Evento Info']?.title}
          title2={metaData['Evento Info']?.title_2}
          subTitle={metaData['Evento Info']?.subTitle}
          subTitle2={metaData['Evento Info']?.subTitle2}
          onSmoothScroll={smoothScroll}
        />
        {metaData['Evento Info'] && markdownContents['Evento Info'] && (
          <div id="informacoes" ref={sectionRefs.informacoes}>
            <Info
              data={metaData['Evento Info'].data}
              local={metaData['Evento Info'].local}
              localMedia={metaData['Evento Info'].localMedia}
              markdown={markdownContents['Evento Info']}
            />
          </div>
        )}
        {scheduleTitle && scheduleItems && (
          <div id="schedule" ref={sectionRefs.schedule}>
            <Schedule title={scheduleTitle} scheduleItems={scheduleItems} />
          </div>
        )}
        {metaData['Participants'] && markdownContents['Participants'] && (
          <div id="participants" ref={sectionRefs.participants}>
            <Participants 
              markdownContent={markdownContents['Participants']}
            />
          </div>
        )}
        {markdownContents['Edições Anteriores'] && metaData['Edições Anteriores'] && (
          <div id="edicoes-anteriores" ref={sectionRefs['edicoes-anteriores']}>
            <PastEditions
              markdown={markdownContents['Edições Anteriores']}
              metaData={metaData['Edições Anteriores']}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
