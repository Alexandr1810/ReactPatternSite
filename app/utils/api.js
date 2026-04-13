
import { server_config } from '@/app/utils/server_config.js'

export const api = (url, options = {}) =>{
  return fetch(server_config.api_host+url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
}