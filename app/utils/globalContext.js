'use client'

import React, {createContext, useContext, useState, useEffect} from 'react'

const globalContext = createContext();


export default function GlobalContext({children, initialOffers }){ 
  const [offers, setOffers] = useState(initialOffers);

  const [dealModal, setDealModal] = useState({
      showPhone: true,
      modalName: 'Оставить заявку',
      reachGoal: ''
  });

    
  const [activeOffer, setActiveOffer] = useState(offers[0])
    // Оставить пустым, а тарифы грузить через useEffect

  useEffect(() => {
    const found = offers.find(item => item.id === activeOffer.id);
    setActiveOffer(found ?? offers[0]);
  }, [offers]);

  const toggleFieldById = (id, field, elem) => {
        console.log(id, field, elem)
        console.log(id, field, elem.checked)
        setOffers(prev =>
        prev.map(item =>
            item.id === id
            ? { ...item, [field]: elem.checked }
            : item
        )
        );
        if (elem.checked) {
            elem.parentNode.parentNode.parentNode.getElementsByClassName('left-side')[0].classList.add('active')
        }else{
            elem.parentNode.parentNode.parentNode.getElementsByClassName('left-side')[0].classList.remove('active')
        }
  };

  return(
    <globalContext.Provider value={{ 
        dealModal, setDealModal, 
        offers, toggleFieldById,
        activeOffer, setActiveOffer
      }}>
      {children}
    </globalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(globalContext);
}