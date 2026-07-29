
import "@/app/globals.css";
import { loadOffers } from '@/app/utils/getOffers';


import { loadConfig } from '@/app/utils/components-config.js';
import { setActiveCity } from '@/app/utils/getCities'



import { server_config } from '@/app/utils/server_config.js'

export async function generateMetadata({params}) {
  const { city } = await params;
  const { name } = await params;

  const activeCity = await setActiveCity(city);
  const { allOffers_plans } = await loadOffers();

  const tarif = allOffers_plans.find(item => item.url_name === name)

  const site_config = await loadConfig();
  
  let title, description = '';

  const seo_indexing = Number(site_config.seo_indexing) ? true : false;
  const canonical_enabled = site_config.canonical_url.includes('http');
  const canonical_url = site_config.canonical_url;

  if (server_config.site_key !== 'domatelecom') {
    title = `${site_config.provider_name} в городе ${activeCity.city} | Тариф ${tarif.name}`;

    if (tarif.services.includes('internet')) {
      description += `Домашний Интернет со скоростью ${tarif.speed} Мб/сек`
    }
    if (tarif.services.includes('internet') && (tarif.services.includes('iptv') || tarif.services.includes('ktv'))) {
      description += ` и ТВ на ${tarif.tv} каналов`
    }
    else if(tarif.services.includes('iptv') || tarif.services.includes('ktv')){
      description += `ТВ на ${tarif.tv} каналов`
    }
    description += ` в городе ${activeCity.city} по цене ${tarif.price} Р/мес. Подключайся выгодно!`
  }else{
    title = `${site_config.provider_name} | Тариф ${tarif.name}`;
    
    if (tarif.services.includes('internet')) {
      description += `Домашний Интернет со скоростью ${tarif.speed} Мб/сек`
    }
    if (tarif.services.includes('internet') && (tarif.services.includes('iptv') || tarif.services.includes('ktv'))) {
      description += ` и ТВ на ${tarif.tv} каналов`
    }
    else if(tarif.services.includes('iptv') || tarif.services.includes('ktv')){
      description += `ТВ на ${tarif.tv} каналов`
    }
    description += `по цене ${tarif.price} Р/мес. Подключайся выгодно!`
  }

  return {
    icons: {
      icon: `${server_config.api_protocol}://${server_config.site_folder}/uploads/${server_config.site_key}/favicon/favicon-32x32.png`,
      shortcut: `${server_config.api_protocol}://${server_config.site_folder}/uploads/${server_config.site_key}/favicon/favicon-32x32.png`,
      apple: `${server_config.api_protocol}://${server_config.site_folder}/uploads/${server_config.site_key}/favicon/favicon-32x32.png`,
    },
    robots: {
      index: seo_indexing,
      follow: seo_indexing,
      // опционально, для гугл-бота отдельно:
      googleBot: {
        index: seo_indexing,
        follow: seo_indexing,
      },
    },
    ...(canonical_enabled ? {
      alternates: {
        canonical: canonical_url,
      },
    } : {}),
    openGraph: { // Мета-штуки
      title: title,
      description: description,
      url: `${server_config.api_protocol}://${server_config.site_folder}/`,
      siteName: site_config.provider_name,
      type: 'website', // og:type
      locale: 'ru_RU',

      images: [
      {
        url: `${server_config.api_protocol}://${server_config.site_folder}/uploads/${server_config.site_key}/img/OG_Image.png`, // абсолютный URL
        alt: `Превью сайта ${site_config.provider_name}`,
      },
    ],

    },
    title: title,
    description: description,
  };
}

export default async function RootLayout({ children }) {


  return (
      <>
          {children}
      </>
  );
}
