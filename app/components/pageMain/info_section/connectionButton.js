'use client';

import { useGlobalContext } from '@/app/utils/globalContext';

import {openModal} from '@/app/utils/functions'

export default function ConnectionButton() {

  const { setDealModal } = useGlobalContext();


  return (
    <button type='button' 
      onClick={() => {
        setDealModal({modalName: 'Закажите консультацию', showPhone: false, reachGoal: "formConsult"})
        openModal('dealModal')
        }
      }
    >Закажите консультацию</button>
  );
}