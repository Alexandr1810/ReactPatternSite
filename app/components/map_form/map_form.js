
import Form from '../dealForm'

function MapForm({site_config, activeCity, map_img, reachGoals}){

    return(
        <section className="mapFormSection">
            <h2 className="mapFormSection-title">
                Есть ли {site_config.provider_name} в моем доме?
            </h2>
            <div className='mapFormSection-container'>
                <div className='mapFormSection-form'>
                    <span className='mapFormSection-form-title'>Проверить адрес</span>
                    <Form reachGoal="formAdressCheck" reachGoals={reachGoals} formId="mapForm"  formName="Заявка на проверку адреса" activeCity={activeCity.city} />
                </div>
                <div className='mapFormSection-map'>
                    <img 
                    alt={Number(site_config.show_city) ?
                        `Проверить адрес подключения ${site_config.genitive_provider_name} в г.${activeCity.city}`
                        :
                        `Проверить адрес подключения ${site_config.genitive_provider_name}`
                    } 
                    src={map_img} 
                    />
                </div>
            </div>
        </section>
    )
}
export default MapForm;