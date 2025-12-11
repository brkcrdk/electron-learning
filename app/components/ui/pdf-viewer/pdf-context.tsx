import { createContext, type PropsWithChildren, use, useState } from 'react';

interface PdfContextProps {
  zoomLevel: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const PdfContext = createContext<PdfContextProps | null>(null);

export const PdfContextProvider = ({ children }: PropsWithChildren) => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 10);
  };

  return (
    <PdfContext.Provider
      value={{
        zoomLevel,
        handleZoomIn,
        handleZoomOut,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
};

export function usePdfContext() {
  const context = use(PdfContext);

  if (!context) {
    throw new Error('usePdfContext must be used within a PdfContext');
  }

  return context;
}
