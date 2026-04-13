'use client'

import {openModal} from '@/app/utils/functions'

export default function SelectСity({activeCity}) {
  return (
    <span className='cityText'
    onClick={()=>{
        openModal('cityModal')
    }}>{activeCity}</span>
  );
}
