import { useQuery } from '@tanstack/react-query';
const baseUrl = import.meta.env.BASE_URL && import.meta.env.BASE_URL !== '/' && import.meta.env.BASE_URL !== '' && import.meta.env.BASE_URL !== undefined
  ? `/${import.meta.env.BASE_URL.replace(/^\/|\/$/g, '')}/`
  : '/';

export const fetchMarkdownContent = async (file) => {
  const response = await fetch(file);
  return response.text();
};

export const fetchNotionBlocks = async () => {
  try {
    const response = await fetch(`${baseUrl}content/notionBlocks.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch notionBlocks.json');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching notionBlocks.json:', error);
    return []; // Retorna um array vazio como fallback
  }
};

export const useNotionBlocks = () => {
  return useQuery({
    queryKey: ['notionBlocks'],
    queryFn: fetchNotionBlocks,
    retry: 1, // Tenta uma vez mais antes de falhar
    onError: (error) => {
      console.error('Error in useNotionBlocks:', error);
    },
  });
};

export const useMarkdownData = (notionBlocks) => {
  return useQuery({
    queryKey: ['markdownData', notionBlocks],
    queryFn: async () => {
      if (!notionBlocks) return null;
      const contents = {};
      for (const block of notionBlocks) {
        contents[block.name] = await fetchMarkdownContent(`${baseUrl}content/${block.fileName}`);
      }
      return contents;
    },
    enabled: !!notionBlocks,
  });
};
