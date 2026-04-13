'use client';

import { useGlobalContext } from '@/app/utils/globalContext';

import {openModal} from '@/app/utils/functions'

export default function ModalLink({ item }) {

  const { setDealModal } = useGlobalContext();


  return (
    <a href='#' className={item.light ? 'active' : ''}
        onClick={() => {
            setDealModal({modalName: item.modal_title, showPhone: false, reachGoal: item.ym_reachGoal})
            openModal('dealModal')
        }}
        
    >{item.title}</a> 
  );
}