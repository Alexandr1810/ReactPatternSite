'use client'
import React from 'react'

function SliderNav(props){ //'slider-nav-item active'
    return(
        <div 
            key={props.index} 
            className={props.index === props.activeSlide ? 'slider-nav-item active': 'slider-nav-item'}
            onClick={() => props.on_setSlide(props.index)}
            >
            <a href={`#allOffers`}>{props.slide.title}</a>
        </div>
        
    )
}
export default SliderNav;