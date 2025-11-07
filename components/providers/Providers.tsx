'use client';

import { store } from '@/lib/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { initializeState } from '@/lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeState());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}