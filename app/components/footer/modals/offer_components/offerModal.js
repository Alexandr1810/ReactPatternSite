'use client'

import React, {useState} from 'react'
import Form from '@/app/components/dealForm'
import AllOffers_Item from '@/app/components/pageMain/all_offers/allOffers_item.js'
import { useGlobalContext } from '@/app/utils/globalContext';
import { pluralize } from '@/app/utils/functions'


function OfferModal({closeModal, icons, logo_small, activeCity, reachGoals, site_config}){
    const { toggleFieldById, activeOffer } = useGlobalContext() 
    return(
        <div className='modal' id="offerModal">
            <div className='modal-background modal-fade' onClick={()=>closeModal('offerModal')} ></div>
            <div className='modal-content modal-fade'>
                <div className='modal-header'>
                    <span className='modal-header-title'></span>
                    <img className='modal-header-close' onClick={()=>closeModal('offerModal')} src={icons.close_icon} />
                </div>
                <div className='modal-body'>
                    
                    <AllOffers_Item
                        icons={icons}
                        toggleFieldById = {toggleFieldById}
                        plan={activeOffer}
                        pluralize={pluralize}
                        modalItem={true}
                    />
                    
                    <div className='offer-infoBlock'>
                        <img src={logo_small} />
                        <span>Подключиться прямо сейчас: <br />быстро и удобно!</span>
                    </div>
                    <div className='offer-formBlock'>
                        <span className='modal-header-title'>Оставить заявку</span>
                        <Form site_config={site_config} reachGoal="zakazatPodkluchenie" reachGoals={reachGoals} formName="Офер (Оставить заявку)" formId="offerModalForm" offer={activeOffer} activeCity={activeCity} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default OfferModal;