import axios from 'axios';
import { server_config } from '../../utils/server_config'


export async function loadYMConfig(isAdmin = false) {
  console.log('Загружаю конфиг Яндекс Метрики')
  
  let reachGoals = null
  let reachGoals_original = null

  const res = await fetch(server_config.api_host+`/front/getYandexMetrikaConfig/${server_config.site_key}`, {
    ...(isAdmin
      ? { cache: 'no-store' }
      : { next: { revalidate: 3600 } })
  });
  
  const data = await res.json();
  console.log(data)
  
  reachGoals_original = data.data

  reachGoals = data.data.reduce((acc, item) => {
      acc[item.parameter] = item.value;
      return acc;
  }, {});

  return {
    reachGoals_original,
    reachGoals
  }
}
