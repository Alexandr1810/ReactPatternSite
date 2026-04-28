'use client'

import {openModal, closeModal} from '@/app/utils/functions'
import React, {useEffect} from 'react'

export default function SelectСity({activeCity, params_city, site_config}) {
  
  //Кидаем алерт если не выбран город
  useEffect(() => {
    if (!params_city && Number(site_config.show_city)) openModal('CityAlert')
  }, []);

  return (
    <button className='cityText'
    onClick={()=>{
        openModal('cityModal')
        closeModal('CityAlert')
    }}>Нет, изменить</button>
  );
}
