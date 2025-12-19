import { useEffect, useState } from 'react';

import Icon from '@app/components/ui/icon';
import Tooltip from '@app/components/ui/tooltip';

import type { ThemeType } from '../../../store/theme';

function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const getTheme = async () => {
      const theme = await window.store.getTheme();
      setTheme(theme.id);
    };

    getTheme();
  }, []);

  const toggleTheme = async () => {
    if (theme === 'light') {
      await window.store.setTheme('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.classList.remove('light');
      setTheme('dark');
    } else {
      await window.store.setTheme('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
      setTheme('light');
    }
  };
  return (
    <Tooltip>
      <Tooltip.Trigger onClick={toggleTheme}>
        <Icon name="contrast-filled" />
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Tema Değiştir</p>
      </Tooltip.Content>
    </Tooltip>
  );
}

export default ThemeToggle;
