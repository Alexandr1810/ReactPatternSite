'use client';

import { useGlobalContext } from '@/app/utils/globalContext';

import {openModal} from '@/app/utils/functions'

export default function ConnectionButton() {

  const { setDealModal } = useGlobalContext();


  return (
    <button className="header-btn"
        onClick={() => {
            setDealModal({modalName: 'Оставьте заявку', showPhone: true, reachGoal: "zakazatPodkluchenie"})
            openModal('dealModal')
        }}
        
    >Подключить</button> 
  );
}