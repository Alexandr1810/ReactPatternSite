'use client';

import { useGlobalContext } from '@/app/utils/globalContext';

import {openModal} from '@/app/utils/functions'

export default function TpButton() {

  const { setDealModal } = useGlobalContext();


  return (
    <span className="tpButton"
      onClick={() => {
          openModal('tpModal')
      }}
    >
      <span className='tp_desctop'>Техническая поддержка</span>
      <span className='tp_mobile'>Тех. Поддержка</span>
    </span>
  );
}