import CityModal from './city_components/cityModal'
import CityAlert from './city_components/cityAlert'
import OfferModal from './offer_components/offerModal'
import SendDoneModal from './other_components/sendDone_modal'
import SendErrorModal from './other_components/sendError_modal'
import SendAlarmModal from './other_components/sendAlarm_modal'
import DealModal from '@/app/components/footer/modals/dealModal'
import { openModal, closeModal } from '@/app/utils/functions'
import { loadYMConfig } from '@/app/mods/YandexMetrika/YandexMetrika_config.js'

async function Modals({icons, logo_small, cities_list, cities_list_original, activeCity, params_city, connection_phone, telegramText}){
    const {reachGoals} = await loadYMConfig()
    return(
        <section className="modalsSection">
            <OfferModal 
                closeModal={closeModal}
                icons={icons}
                logo_small={logo_small}
                activeCity={activeCity}
                reachGoals={reachGoals}
            />
            <CityModal 
                closeModal={closeModal}
                cities_list={cities_list} 
                icons={icons}
                activeCity={activeCity}
                cities_list_original={cities_list_original}
            />
            <CityAlert 
                closeModal={closeModal}
                openModal={openModal} 
                icons={icons}
                activeCity={activeCity} 
                cities_list_original={cities_list_original}
                params_city={params_city}
            />
            <DealModal 
                closeModal={closeModal}
                logo_small={logo_small}
                icons={icons}
                connection_phone={connection_phone} 
                activeCity={activeCity}
                reachGoals={reachGoals}
            />
            <SendDoneModal 
                closeModal={closeModal}
                telegramText={telegramText} 
            />
            <SendAlarmModal 
                closeModal={closeModal}
                telegramText={telegramText} 
            />
            <SendErrorModal 
                closeModal={closeModal}
                telegramText={telegramText} 
            />
            
        </section>
    )
}
export default Modals;