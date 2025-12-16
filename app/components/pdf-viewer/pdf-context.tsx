import { createContext, type PropsWithChildren, use, useState } from 'react';

interface PdfContextProps {
  zoomLevel: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const DEFAULT_ZOOM_LEVEL = 1;
const ZOOM_LEVEL_STEP = 0.1;
const MAX_ZOOM_LEVEL = 2.4;
const MIN_ZOOM_LEVEL = 0.5;

const PdfContext = createContext<PdfContextProps | null>(null);

export const PdfContextProvider = ({ children }: PropsWithChildren) => {
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL);

  const handleZoomIn = () => {
    if (zoomLevel >= MAX_ZOOM_LEVEL) return;
    setZoomLevel(zoomLevel + ZOOM_LEVEL_STEP);
  };

  const handleZoomOut = () => {
    if (zoomLevel <= MIN_ZOOM_LEVEL) return;
    setZoomLevel(zoomLevel - ZOOM_LEVEL_STEP);
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
