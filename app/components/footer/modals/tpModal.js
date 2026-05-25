'use client'

import React, {useState} from 'react'

import { useGlobalContext } from '@/app/utils/globalContext';
import {closeModal} from '@/app/utils/functions'


export default function TpModal({icons, logo_small, activeCity, support_phone, reachGoals }){ 
    const { dealModal } = useGlobalContext()

    return(
        <div className='modal' id="tpModal">
            <div className='modal-background modal-fade'  onClick={()=>closeModal('tpModal')} ></div>
            <div className='modal-content modal-fade' style={{width: "fit-content"}}>
                <div className='modal-header'>
                    <span className='modal-header-title'></span>
                    <img className='modal-header-close' onClick={()=>closeModal('tpModal')} src={icons.close_icon} />
                </div>
                <div className='modal-body'>
                    <div className='dealModal-infoBlock'style={{justifyContent: "center"}}>
                        <img src={logo_small} />
                        <span>Техническая поддержка</span>
                    </div>
                    {dealModal.showPhone && 
                        <div className='dealModal-phoneBlock' style={{width: "fit-content"}}>
                            <span className='dealModal-phoneBlock-title'>Позвоните нам по номеру <a onClick={()=>{
                                console.log(1)
                                if (window.ym) {
                                    console.log(2)
                                    console.log(reachGoals.ym_counter)
                                    console.log(reachGoals.phoneHead)
                                    window.ym(reachGoals.ym_counter, 'reachGoal', reachGoals.support); 
                                }
                            }} href={`tel:${support_phone}`}><b>{support_phone}</b></a></span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
