import React from 'react'
import { loadConfig } from '@/app/utils/components-config'

function Slide({index, activeSlide, slide, activeCity, provider_name}){ //'slider-textBlock-elem'
    return(
        <div className={index === activeSlide ? 'slider-textBlock-elem': 'd-none'}>
            <img 
                alt={`${slide.title} ${provider_name} г.${activeCity}`}
                src={slide.image} 
                className='slider-textBlock-image' 
            />
            <div className='sliderIcons'>
            {
                slide.icons.map((icon, index) => (
                    <img key={index} src={icon} className='slider-textBlock-icon'/>
                ))
            }
            </div>
            <span className='slider-textBlock-title'>{slide.title}</span>
        </div>
    )
}
export default Slide;