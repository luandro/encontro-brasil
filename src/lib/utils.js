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
  const regex = /^(?:##\s(.+)|!\[(.+?)\]\((.+?)\)|<iframe.*?src="(.+?)".*?title="(.+?)".*?><\/iframe>)/gm;
  const matches = [...markdown.matchAll(regex)];
  return matches.map(match => {
    if (match[1]) {
      return { type: 'title', content: match[1] };
    } else if (match[2] && match[3]) {
      return { type: 'image', alt: match[2], src: match[3] };
    } else if (match[4] && match[5]) {
      return { type: 'video', src: match[4], title: match[5] };
    }
  }).filter(Boolean);
};

export const smoothScroll = (to) => {
  document.querySelector(`#${to}`).scrollIntoView({
    behavior: 'smooth'
  });
};
