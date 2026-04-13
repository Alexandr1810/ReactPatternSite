'use client'

import React, {useEffect, useRef, useState} from 'react'
import { useInView } from '../../hooks/useInView';

function Banner_Item(props){
    const { ref, inView } = useInView();
    const [particles, setParticles] = useState([]);

    
    useEffect(() => {
        const generated = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * 100,
        delay: Math.random() * 5,
        y: Math.random() * 40,
        }));

        setParticles(generated);
    }, []);

    return(
        <div className={`banner-component ${inView ? 'visible' : ''}`} ref={ref}>
            <div className="particles">
                {particles.map((p, i) => (
                    <div
                        className="particle"
                        key={i}
                        style={{
                        "--rand-x": p.x,
                        "--rand-delay": `${p.delay}s`,
                        "--rand-y": `${p.y}px`,
                        }}
                    />
                ))}
            </div>
            <div className='banner-block'>
                <div className='banner-block-bg'></div>
                <img src={props.banner_item.icon} />
                <h3>{props.banner_item.title}</h3>
                <p>{props.banner_item.text}</p>
            </div>
        </div>
    )
}
export default Banner_Item;