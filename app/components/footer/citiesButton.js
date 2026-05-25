'use client';

import {openModal} from '@/app/utils/functions'

export default function CitiesButton() {

  return (
    <a href="#1810" className="footer-btn"
        onClick={() => {
            openModal('citiesModal')
        }}
        
    >Города в которых мы подключаем самостоятельно</a> 
  );
}