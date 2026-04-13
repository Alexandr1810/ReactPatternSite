'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';

function AdvantagesItem({site_config, index, activeCity, advantagesItem}) {
  const { ref, inView } = useInView();
  const imgAlts = [
    "Доступность подключения домашнего интернета и тв от",
    "Эксперты в подключении домашнего интернета и телевидения",
    "Подключить домашний интернет и тв от",
    "Видеонаблюдение, онлайн-кинотеатры и дополнительные услуги от"
  ]
  return (
    <div className={`advantages-block ${inView ? 'visible' : ''}`} ref={ref} >
        <img
            alt={`${imgAlts[index]} ${site_config.genitive_provider_name} в г.${activeCity.city}`} 
            src={advantagesItem.image} 
        />

        <div className='advantages-block-inner'>
            <h3 className="advantages-title">
                {advantagesItem.title}
            </h3>

            <div className="advantages-items">
                {
                advantagesItem.items.map((item, index)=>(
                    <p className="advantages-item" key={index}>{item}</p>
                ))}
            </div>
        </div>
    </div>
  );
}

export default AdvantagesItem;
