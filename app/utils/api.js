
import { server_config } from '@/app/utils/server_config.js'

export const api = (url, options = {}) =>{
  return fetch(`http://${server_config.site_folder}${url}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
}