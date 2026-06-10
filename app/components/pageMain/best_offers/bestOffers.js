'use client'

import TarifPreview from './bestOffers-item'
import { pluralize } from '@/app/utils/functions'
import SelectСity from './select_city'
import { useGlobalContext } from '@/app/utils/globalContext';

function Best_Offers({activeCity, main_icons, site_config }){    
    const { offers, toggleFieldById, setActiveOffer } = useGlobalContext() 

    //делаем так, что бы всегда было только 2 лучших оффера 
    const bestOffers_plans = 
        offers.filter(plan => plan.cities.includes(activeCity.city)).filter(plan => plan.bestOffer).length >= 2 ?
        offers.filter(plan => plan.cities.includes(activeCity.city)).filter(plan => plan.bestOffer).sort((a, b) => Number(a.price) - Number(b.price)).slice(0, 2) :
        offers.filter(plan => plan.cities.includes(activeCity.city)).sort((a, b) => Number(b.price) - Number(a.price)).slice(0, 2)


    console.log(bestOffers_plans)
    return(
        <section className='bestOffers'>
            <h2 className='bestOffers-title'>Лучшие предложения в городе {Number(site_config.show_city) ? <SelectСity 
                    activeCity={activeCity.city}
                /> : ''}
            </h2> {/* onClick={() => props.openModal('cityModal')} */}
            <div className='bestOffers-container'>
                {
                bestOffers_plans.map((plan)=>(
                    <TarifPreview
                        key={plan.id}
                        icons={main_icons} 
                        activeCity={activeCity}
                        plan={plan}
                        pluralize={pluralize}
                        toggleFieldById={toggleFieldById}
                        setActiveOffer={setActiveOffer}
                    />
                ))
                }
            </div>
        </section>
    )
}
export default Best_Offers;