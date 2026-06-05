'use client'

import OfferDescriptionText from './offerDescription-text';
import OfferDescriptionItem from './offerDescription-item';

import { useGlobalContext } from '@/app/utils/globalContext';
import { notFound } from 'next/navigation';


function OfferDescription(props){
    const { offers, toggleFieldById, activeOffer } = useGlobalContext() 

    const item = () => {
        if (props.url_name && offers) {
            console.log('good')
            console.log(props.url_name, offers)
            console.log(offers.find(obj => obj.url_name === props.url_name))

            return offers.find(obj => obj.url_name === props.url_name);
        }else{
            notFound();
        }
    };
    if(!item()){
        notFound();
    }

    return(
        <section className="offerDescription">
            <h2 className="offerDescription-title">Описание предложения</h2>

            <OfferDescriptionText activeOffer={item()} genitive_provider_name={props.site_config.genitive_provider_name} provider_name={props.site_config.provider_name} icons={props.icons} />
            {
                props.OfferDescriptions_items.map((item, index) => (
                    <OfferDescriptionItem key={index} item={item} />
                ))
            }
        </section>
    )
}

export default OfferDescription
