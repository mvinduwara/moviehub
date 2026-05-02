'use client';

import { useEffect } from 'react';
import { useContinueWatchingStore, WatchProgress } from '@/store/continueWatchingStore';

export default function ProgressTracker({ item }: { item: Omit<WatchProgress, 'updatedAt'> }) {
  const addOrUpdateItem = useContinueWatchingStore((state) => state.addOrUpdateItem);

  useEffect(() => {
    addOrUpdateItem(item);
  }, [item, addOrUpdateItem]);

  return null;
}