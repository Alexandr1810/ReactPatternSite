import axios from 'axios';
import { server_config } from '@/app/utils/server_config'
import { notFound } from 'next/navigation';


export async function loadOffers(isAdmin = false) {
  console.log('Загружаю тарифы')
  
  let allOffers_plans = null;

  const res = await fetch(`http://${server_config.site_folder}/front/getOffers/${server_config.site_key}`, {
    ...(isAdmin
      ? { cache: 'no-store' }
      : { next: { revalidate: server_config.сaching_period } })
  });
  const data = await res.json();
  // У axios данные уже в res.data
  allOffers_plans = data.data;
  
  return {allOffers_plans};
}
