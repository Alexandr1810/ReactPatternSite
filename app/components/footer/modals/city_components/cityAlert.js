import Link from "next/link";
import SelectСity from './select_city'

function CityAlert({activeCity, params_city, site_config}){
    return(
        <div className='CityAlert' id="CityAlert">
            <span className='CityAlert-title'>Ваш город {activeCity.city}?</span>
            <div className='CityAlert-buttons'>
                <Link href={`/${activeCity.code}`}>Да</Link>
                <SelectСity 
                    site_config={site_config}
                    params_city={params_city}
                />
            </div>
        </div>
    )
}
export default CityAlert;