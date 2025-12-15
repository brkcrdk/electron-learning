import { createContext, useContext, type PropsWithChildren } from 'react';

import type { ToggleVariantsTypes } from '../toogle';

interface ToggleContextProps {
  size: ToggleVariantsTypes['size'];
  variant: ToggleVariantsTypes['variant'];
  spacing?: number;
}

export const ToggleContext = createContext<ToggleContextProps>({
  size: 'default',
  variant: 'default',
  spacing: 0,
});

interface Props extends PropsWithChildren {
  size?: ToggleVariantsTypes['size'];
  variant?: ToggleVariantsTypes['variant'];
  spacing?: number;
}

export const ToggleContextProvider = ({ children, size = 'default', variant = 'default', spacing = 0 }: Props) => {
  return (
    <ToggleContext.Provider
      value={{
        size,
        variant,
        spacing,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export function useToggleContext() {
  return useContext(ToggleContext);
}
