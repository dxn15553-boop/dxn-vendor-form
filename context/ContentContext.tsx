
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentService, INITIAL_CONTENT } from '../services/ContentService';

type ContentContextType = {
  content: typeof INITIAL_CONTENT;
  updateContent: (newContent: typeof INITIAL_CONTENT) => void;
  loading: boolean;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<typeof INITIAL_CONTENT>(INITIAL_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await ContentService.fetchAll();
      setContent(data);
      setLoading(false);
    }
    load();
  }, []);

  const updateContent = async (newContent: typeof INITIAL_CONTENT) => {
    setContent(newContent);
    await ContentService.saveAll(newContent);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
