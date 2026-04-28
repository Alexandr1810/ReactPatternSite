'use client';

import { clearCache } from '@/app/actions/revalidate';

export default function ClearCacheButton() {
  return (
    <form action={clearCache} className='clearCacheButton'>
      <button type="submit">Сбросить кэш</button>
    </form>
  );
}