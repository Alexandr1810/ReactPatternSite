
import { server_config } from '@/app/utils/server_config.js'

export const api = (url, options = {}) =>{
  return fetch(`${server_config.api_protocol}://${server_config.site_folder}${url}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
}