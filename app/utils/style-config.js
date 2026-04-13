import axios from 'axios';
import { server_config } from './server_config.js'
//Либа для получения фильтров для покраски иконок
import { hexToCSSFilter } from 'hex-to-css-filter';

let main_colors = null;

// --- Получаем средний цвет для более приятных градиентов --- //
function colorMix(hex1, hex2, percent = 50) {
  const w = percent / 100;

  const parse = (hex) => {
    hex = hex.replace("#", "");
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const c1 = parse(hex1);
  const c2 = parse(hex2);

  const r = Math.round(c1.r * (1 - w) + c2.r * w);
  const g = Math.round(c1.g * (1 - w) + c2.g * w);
  const b = Math.round(c1.b * (1 - w) + c2.b * w);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`;
}

export async function loadStyles(isAdmin = false) {
  console.log('Загружаю стили')

  const res = await fetch(`https://${server_config.site_folder}/front/getSiteConfig/${server_config.site_key}`, {
    ...(isAdmin
      ? { cache: 'no-store' }
      : { next: { revalidate: 3600 } })
  });
  const data = await res.json();

  // У axios данные уже в res.data
  main_colors = data.data
  main_colors.additional_color = colorMix(main_colors.primary_color, main_colors.secondary_color, 40)

  /* --- Задаем консты для главного и акцентного цветов в css --- //
  document.documentElement.style.setProperty('--primary-color', main_colors.primary_color);
  document.documentElement.style.setProperty('--secondary-color', main_colors.secondary_color);
  document.documentElement.style.setProperty('--additional-color', main_colors.additional_color);
  document.documentElement.style.setProperty('--primary-filter', hexToCSSFilter(main_colors.primary_color).filter);
  document.documentElement.style.setProperty('--secondary-filter', hexToCSSFilter(main_colors.secondary_color).filter);
  document.documentElement.style.setProperty('--additional-filter', hexToCSSFilter(main_colors.additional_color).filter);
  */
 console.log(data)
 const result = `:root {
    --primary-color: ${main_colors.primary_color};
    --secondary-color: ${main_colors.secondary_color};
    --additional-color: ${main_colors.additional_color};
    --primary-filter: ${hexToCSSFilter(main_colors.primary_color).filter};
    --secondary-filter: ${hexToCSSFilter(main_colors.secondary_color).filter};
    --additional-filter: ${hexToCSSFilter(main_colors.additional_color).filter};
  }`
 console.log(result)
  return result
}
