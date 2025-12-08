import { createContext, use, type PropsWithChildren } from 'react';

interface DrawerContextProps {
  drawerId: string;
}
const DrawerContext = createContext<DrawerContextProps | null>(null);

interface Props extends PropsWithChildren {
  drawerId: string;
}

export function DrawerContextProvider({ children, drawerId }: Props) {
  return <DrawerContext.Provider value={{ drawerId }}>{children}</DrawerContext.Provider>;
}

export default DrawerContext;

export function useDrawerContext() {
  const context = use(DrawerContext);

  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerContextProvider');
  }

  return context;
}
