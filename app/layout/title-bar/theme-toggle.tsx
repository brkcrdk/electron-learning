import { useEffect, useState } from 'react';

import Icon from '@app/components/ui/icon';

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
      document.documentElement.setAttribute('data-theme', 'dark');
      setTheme('dark');
    } else {
      await window.store.setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      setTheme('light');
    }
  };
  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value={theme}
        onChange={toggleTheme}
      />
      <Icon
        name="sun"
        className="swap-off size-5"
      />

      <Icon
        name="moon"
        className="swap-on size-5"
      />
    </label>
  );
}

export default ThemeToggle;
