'use client';

import { useGlobalContext } from '@/app/utils/globalContext';

import {openModal} from '@/app/utils/functions'

export default function ConnectionButton({site_config, reachGoals}) {

  const { setDealModal } = useGlobalContext();


  return (
    <a className="header-btn"
      onClick={()=>{
        if (window.ym) {
            console.log(2)
            console.log(reachGoals.ym_counter)
            console.log(reachGoals.phoneHead)
            window.ym(reachGoals.ym_counter, 'reachGoal', reachGoals.phoneHead); 
        }
      }} href={`tel:${site_config.connection_phone}`}
    >{site_config.connection_phone}</a> 
  );
}