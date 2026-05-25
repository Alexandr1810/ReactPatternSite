'use client';

import { useGlobalContext } from '@/app/utils/globalContext';

import {openModal} from '@/app/utils/functions'

export default function TpButton() {

  const { setDealModal } = useGlobalContext();


  return (
    <button className="header-btn supportButton"
      onClick={() => {
          openModal('tpModal')
      }}
    >
      <span className='headerTop-contactBlock-tp_desctop'>Техническая поддержка</span>
      <span className='headerTop-contactBlock-tp_mobile'>Тех. Поддержка</span>
    </button>
  );
}