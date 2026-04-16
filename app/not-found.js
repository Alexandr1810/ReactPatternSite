import Link from 'next/link';

import {
  loadItemsConfig,
} from '@/app/utils/components-config.js'

export default async function NotFound() {
  const { logo_small } = await loadItemsConfig(true);

  return (
    <div className="notFound main">
        <div className='notFound-logo'>
            <img src={logo_small} />
            <span>Страница не найдена</span>
        </div>
        <Link href="/">
            На главную
        </Link>
    </div>
  );
}