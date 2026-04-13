'use client'

import {openModal, closeModal} from '@/app/utils/functions'
import React, {useEffect} from 'react'

export default function SelectСity({activeCity, params_city}) {

  useEffect(() => {
    if (!params_city) openModal('CityAlert')
  }, []);

  return (
    <button className='cityText'
    onClick={()=>{
        openModal('cityModal')
        closeModal('CityAlert')
    }}>Нет, изменить</button>
  );
}
