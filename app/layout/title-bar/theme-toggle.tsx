import { useEffect, useState } from 'react';

import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

import type { ThemeType } from '../../../store/theme';

function ThemeToggle() {
  // const [theme, setTheme] = useState<ThemeType>('light');

  // useEffect(() => {
  //   const getTheme = async () => {
  //     const theme = await window.store.getTheme();
  //     setTheme(theme.id);
  //   };

  //   getTheme();
  // }, []);

  // const toggleTheme = async () => {
  //   if (theme === 'light') {
  //     await window.store.setTheme('dark');
  //     document.documentElement.classList.add('dark');
  //     document.documentElement.style.colorScheme = 'dark';
  //     document.documentElement.classList.remove('light');
  //     setTheme('dark');
  //   } else {
  //     await window.store.setTheme('light');
  //     document.documentElement.classList.remove('dark');
  //     document.documentElement.classList.add('light');
  //     document.documentElement.style.colorScheme = 'light';
  //     setTheme('light');
  //   }
  // };
  return (
    <Button
      variant="ghost"
      size="icon"
      // onClick={toggleTheme}
    >
      <Icon name="contrast-filled" />
    </Button>
  );
}

export default ThemeToggle;
