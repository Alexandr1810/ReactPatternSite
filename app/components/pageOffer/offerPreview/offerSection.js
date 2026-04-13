'use client'

import React from 'react'
import Form from '@/app/components/dealForm'
import AllOffers_Item from '@/app/components/pageMain/all_offers/allOffers_item'

import { useInView } from '@/app/components/hooks/useInView';
import { useGlobalContext } from '@/app/utils/globalContext';

function OfferSection(props){
    const { ref, inView } = useInView();
    const { offers, toggleFieldById, activeOffer } = useGlobalContext() 
    
    const item = () => {
        if (props.url_name && offers) {
            return offers.find(obj => obj.url_name === props.url_name);
        }else{
            return activeOffer;
        }
    };
    if(!item()){
        notFound();
    }
    
    return(
        <section className={`offerSection ${inView ? 'visible' : ''}`} ref={ref}>
            <AllOffers_Item
                icons={props.icons}
                toggleFieldById = {toggleFieldById}
                plan={activeOffer}
                pluralize={props.pluralize}
                modalItem={true}
            />
            <div>
                <div className='offer-infoBlock'>
                    <img src={props.logo_small} />
                    <span>Подключиться прямо сейчас - <br />быстро и удобно!</span>
                </div>
                <div className='offerSection-form'>
                    <span className='mapFormSection-form-title'>Оставить заявку</span>
                    <Form reachGoal="formTarifPage" reachGoals={props.reachGoals} formId="offerPageForm"  formName="Страница тарифа (Оставить заявку)" offer={activeOffer} activeCity={props.activeCity} />
                </div>
            </div>
        </section>
    )
}

export default OfferSection
