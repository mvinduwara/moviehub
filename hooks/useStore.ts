import { useState, useEffect } from 'react';

export function useStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) {
  const result = store(callback) as F;
  const [data] = useState<F>(result);

  return data;
}