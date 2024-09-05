import { useQuery } from '@tanstack/react-query';

export const fetchMarkdownContent = async (file) => {
  const response = await fetch(file);
  return response.text();
};

export const fetchNotionBlocks = async () => {
  const response = await fetch('/content/notionBlocks.json');
  return response.json();
};

export const useNotionBlocks = () => {
  return useQuery({
    queryKey: ['notionBlocks'],
    queryFn: fetchNotionBlocks,
  });
};

export const useMarkdownData = (notionBlocks) => {
  return useQuery({
    queryKey: ['markdownData', notionBlocks],
    queryFn: async () => {
      if (!notionBlocks) return null;
      const contents = {};
      for (const block of notionBlocks) {
        contents[block.name] = await fetchMarkdownContent(`/content/${block.fileName}`);
      }
      return contents;
    },
    enabled: !!notionBlocks,
  });
};
