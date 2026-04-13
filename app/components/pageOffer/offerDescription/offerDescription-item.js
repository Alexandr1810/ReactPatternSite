'use client';

import React, { useState, useEffect, useRef } from 'react'
import { useInView } from '../../hooks/useInView';

function OfferDescriptionItem(props){
    const { ref, inView } = useInView();
    const itemRef = useRef(null);

    const [isActive, setIsActive] = useState(null);

    useEffect(() => {
    const el = itemRef.current;
        if (!el) return;

        if (isActive) {
            // раскрытие — ТОЛЬКО px
            const height = el.scrollHeight;
            el.style.height = height + 'px';
        } else {
            // закрытие
            el.style.height = '0px';
        }
    }, [isActive]);

    return(
        <div className={`offerDescription-item ${isActive === 'active' ? 'active' : ''}`} ref={ref}>
            <span className="offerDescription-item-title" onClick={() => setIsActive(isActive === 'active' ? null : 'active')}>{props.item.title}</span>
            <div className="offerDescription-item-content" ref={itemRef}>
                <div dangerouslySetInnerHTML={{ __html: props.item.description }} />
            </div>
        </div>
    )
}

export default OfferDescriptionItem
