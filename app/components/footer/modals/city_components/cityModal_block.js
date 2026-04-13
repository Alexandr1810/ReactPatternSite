import React from 'react'
import CityModal_Item from './cityModal_Item'

function CityModal_Block({cities_list_item, activeCity, cities_list_original}){
    return(
        <div className='cities-block_main'>
            <span className='liter-title'>{cities_list_item.liter}</span>
            <div className='cities-block'>
                {
                cities_list_item.cities.map((city, index)=>(
                    <CityModal_Item 
                        key={index}
                        city={city} 
                        activeCity={activeCity} 
                        cities_list_original={cities_list_original}
                    />
                ))
                }
            </div>
        </div>
    )
}
export default CityModal_Block;