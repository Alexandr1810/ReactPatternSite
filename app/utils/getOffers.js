import axios from 'axios';
import { server_config } from '@/app/utils/server_config'
import { notFound } from 'next/navigation';


export async function loadOffers(isAdmin = false) {
  console.log('Загружаю тарифы')
  
  let allOffers_plans = null;

  const res = await fetch(server_config.api_host+`/front/getOffers/${server_config.site_key}`, {
    ...(isAdmin
      ? { cache: 'no-store' }
      : { next: { revalidate: 3600 } })
  });
  const data = await res.json();
  // У axios данные уже в res.data
  allOffers_plans = data.data;

  return {allOffers_plans};
}
