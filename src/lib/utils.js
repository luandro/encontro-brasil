import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const extractMetaData = (text) => {
  const metaRegex = /^---\n([\s\S]*?)\n---/;
  const match = text.match(metaRegex);
  if (!match) return [null, {}];
  const rawMeta = match[0];
  const metaText = match[1];
  const metaData = {};
  metaText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':').map(part => part.trim());
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      metaData[key] = value;
    }
  });
  return [rawMeta, metaData];
};

export const extractParticipants = (markdown) => {
  const sections = markdown.split('\n### ').slice(1);
  return sections.map(section => {
    const [name, ...content] = section.split('\n');
    return { name, content: content.join('\n').trim() };
  });
};

export const extractGalleryItems = (markdown) => {
  const sections = markdown.split('\n## ').slice(1);
  return sections.map(section => {
    const [title, ...content] = section.split('\n');
    const items = content.join('\n').split('\n### ').map(item => {
      const [subtitle, ...details] = item.split('\n');
      return {
        type: 'item',
        title: subtitle.trim(),
        content: details.join('\n').trim()
      };
    });
    return {
      type: 'section',
      title: title.trim(),
      items: items
    };
  });
};

export const extractEventInformation = (markdown) => {
  const lines = markdown.split('\n');
  const eventInfo = {
    title: '',
    title2: '',
    subTitle: '',
    logos: [],
    local: '',
    localMedia: '',
    data: '',
    organization: ''
  };

  let currentSection = '';

  lines.forEach(line => {
    if (line.startsWith('# ')) {
      eventInfo.title = line.replace('# ', '').trim();
    } else if (line.startsWith('## ')) {
      if (!eventInfo.title2) {
        eventInfo.title2 = line.replace('## ', '').trim();
      } else if (!eventInfo.subTitle) {
        eventInfo.subTitle = line.replace('## ', '').trim();
      }
    } else if (line.startsWith('![') && eventInfo.logos.length < 4) {
      const match = line.match(/!\[(.+?)\]\((.+?)\)/);
      if (match) {
        eventInfo.logos.push([match[1], match[1], match[2]]);
      }
    } else if (line.startsWith('### ')) {
      currentSection = line.replace('### ', '').trim().toLowerCase();
    } else if (currentSection === 'local' && line.trim() !== '') {
      if (line.startsWith('![')) {
        const match = line.match(/!\[(.+?)\]\((.+?)\)/);
        if (match) {
          eventInfo.localMedia = match[2];
        }
      } else {
        eventInfo.local += line.trim() + ' ';
      }
    } else if (currentSection === 'data' && line.trim() !== '') {
      eventInfo.data += line.trim() + ' ';
    } else if (currentSection === 'organization' && line.trim() !== '') {
      eventInfo.organization += line.trim() + ' ';
    }
  });

  // Trim any extra spaces
  eventInfo.local = eventInfo.local.trim();
  eventInfo.data = eventInfo.data.trim();
  eventInfo.organization = eventInfo.organization.trim();

  return eventInfo;
};

export const smoothScroll = (to) => {
  document.querySelector(`#${to}`).scrollIntoView({
    behavior: 'smooth'
  });
};
