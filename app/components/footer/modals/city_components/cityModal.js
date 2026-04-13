'use client'

import React, {useState} from 'react'
import CityModal_Block from './cityModal_block'

function CityModal({icons, cities_list, cities_list_original, activeCity, closeModal}){
    const [findCity, setFindCity] = useState('')

    function filterCities(data, findCity) {
        const query = findCity.toLowerCase();
        console.log('data', data)
        return data.cities_list
            .map(region => ({
            liter: region.liter,
            cities: region.cities.filter(city =>
                city.toLowerCase().includes(query)
            )
            }))
            .filter(region => region.cities.length > 0);
    }
    const filtered = filterCities(cities_list, findCity);
    console.log(filtered)

    return(
        <div className='modal' id="cityModal">
            <div className='modal-background modal-fade' onClick={()=>closeModal('cityModal')} ></div>
            <div className='modal-content modal-fade'>
                <div className='modal-header'>
                    <span className='modal-header-title'>Ваш город:</span>
                    <img className='modal-header-close' onClick={()=>closeModal('cityModal')} src={icons.close_icon} />
                </div>
                <div id='cityInput_parent'><input id='cityInput' onChange={(event)=>{setFindCity(event.target.value)}} placeholder='Начните вводить и выберите в списке ниже' /></div>
                {filtered.length > 0 && <div className='cities-list'>
                    {
                        filtered.map((cities_list_item, index) => (
                            <CityModal_Block 
                                key={index}
                                activeCity={activeCity}
                                cities_list_item={cities_list_item} 
                                cities_list_original={cities_list_original}
                            />
                        ))
                    }
                    
                </div>}{filtered.length === 0 && <div className='cities-list'>
                    Такого города нет, проверьте правильность или выберите ближайший к вам город из списка.
                </div>}
            </div>
        </div>
    )
}
export default CityModal;