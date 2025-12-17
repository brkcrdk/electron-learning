import { useEffect, useState } from 'react';

import { useLocation, useRouter } from '@tanstack/react-router';

function useCanGoForward() {
  const [canGoForward, setCanGoForward] = useState(false);
  const { history } = useRouter();
  const location = useLocation();

  useEffect(() => {
    const checkCanGoForward = () => {
      // history.index mevcut konumun indeksini, history.entries tüm geçmiş girişlerini içerir
      // Eğer mevcut indeks, toplam giriş sayısından küçükse ileri gidilebilir
      const currentIndex = location.state.__TSR_index;
      const totalEntries = history.length;
      const canForward = totalEntries > 0 && currentIndex < totalEntries - 1;
      setCanGoForward(canForward);
    };

    // // İlk kontrol
    checkCanGoForward();

    // History değişikliklerini dinle
    const unsubscribe = history.subscribe(() => {
      checkCanGoForward();
    });

    return () => {
      unsubscribe();
    };
  }, [history, location]);

  return canGoForward;
}

export default useCanGoForward;
