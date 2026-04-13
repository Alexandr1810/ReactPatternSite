
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
  const title = `${site_config.provider_name} г.${activeCity.city} | ${tarif.name}`;
  let description = ''

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

  return {
    icons: {
      icon: `https://${server_config.site_folder}/uploads/${server_config.site_key}/favicon/favicon-32x32.png`,
      shortcut: `https://${server_config.site_folder}/uploads/${server_config.site_key}/favicon/favicon-32x32.png`,
      apple: `https://${server_config.site_folder}/uploads/${server_config.site_key}/favicon/favicon-32x32.png`,
    },
    openGraph: { // Мета-штуки
      title: title,
      description: description,
      url: `https://${server_config.site_folder}/`,
      siteName: site_config.provider_name,
      type: 'website', // og:type
      locale: 'ru_RU',

      images: [
      {
        url: `https://${server_config.site_folder}/uploads/${server_config.site_key}/img/OG_Image.png`, // абсолютный URL
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
