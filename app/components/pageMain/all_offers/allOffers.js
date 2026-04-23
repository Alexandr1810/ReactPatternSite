'use client'

import React, { useState, useRef, useEffect } from 'react'
import AllOffers_Item from './allOffers_item'
import AllOffers_Filter from './allOffers_filter'
import { useInView } from '../../hooks/useInView';
import { useGlobalContext } from '@/app/utils/globalContext';

function AllOffers(props) {
    const [container, setContainer] = useState(null)
    const [canPrev, setCanPrev] = useState(false)
    const [canNext, setCanNext] = useState(true)
    const { offers, toggleFieldById, setActiveOffer } = useGlobalContext() 
    
    const allOffers_plans = offers.filter(plan => plan.cities.includes(props.activeCity.city)).sort((a, b) => a.position - b.position)

    const MAX_VELOCITY = 1.2      // px/ms — максимум скорости
    const VELOCITY_SMOOTH = 0.8  // 0..1 — сглаживание
    const MAX_STEP = 40          // px за кадр

    // ✅ ВСЁ drag-состояние в useRef
    const drag = useRef({
        isDragging: false,
        lastX: 0,
        lastTime: 0,
        velocity: 0,
        rafId: null
    })

    const updateButtons = () => {
        if (!container) return
        const { scrollLeft, scrollWidth, clientWidth } = container

        setCanPrev(scrollLeft > 0)
        setCanNext(scrollLeft + clientWidth < scrollWidth - 1)
    }

    const onMouseDown = (e) => {
        if (!container) return

        drag.current.isDragging = true
        drag.current.lastX = e.pageX
        drag.current.lastTime = performance.now()
        drag.current.velocity = 0

        container.classList.add('dragging')
        container.style.scrollBehavior = 'auto'

        // ✅ Слушаем window
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', stopDrag)
    }

    const onMouseMove = (e) => {
        if (!drag.current.isDragging || !container) return
        e.preventDefault()

        const now = performance.now()
        const dx = e.pageX - drag.current.lastX
        const dt = now - drag.current.lastTime

        const rawVelocity = dx / dt

        // clamp скорости
        const clamped = Math.max(
            -MAX_VELOCITY,
            Math.min(MAX_VELOCITY, rawVelocity)
        )

        // сглаживание (low-pass)
        drag.current.velocity = drag.current.velocity * VELOCITY_SMOOTH + clamped * (1 - VELOCITY_SMOOTH)

        drag.current.lastX = e.pageX
        drag.current.lastTime = now

        container.scrollLeft -= dx
    }

    const stopDrag = () => {
        if (!drag.current.isDragging || !container) return

        drag.current.isDragging = false
        container.classList.remove('dragging')

        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', stopDrag)

        applyInertia()
    }

    const applyInertia = () => {
        const friction = 0.92

        const step = () => {
            drag.current.velocity *= friction

            if (Math.abs(drag.current.velocity) < 0.02) {
            cancelAnimationFrame(drag.current.rafId)
            drag.current.rafId = null
            updateButtons()
            return
            }

            let delta = drag.current.velocity * 16
            delta = Math.max(-MAX_STEP, Math.min(MAX_STEP, delta))

            container.scrollLeft -= delta
            drag.current.rafId = requestAnimationFrame(step)
        }

        drag.current.rafId = requestAnimationFrame(step)
    }

    const getScrollStep = () => {
        if (!container) return 0

        const card = container.querySelector('.allOffers-container-block')
        if (!card) return 0

        const gap = parseFloat(getComputedStyle(card).marginRight) || 0

        return card.offsetWidth + gap
    }

    const scrollNext = () => {
        if (!container) return
        container.scrollBy({ left: container.clientWidth-100, behavior: 'smooth' })
    }

    const scrollPrev = () => {
        if (!container) return
        container.scrollBy({ left: -container.clientWidth+100, behavior: 'smooth' })
    }

    const scrollNext_mobile = () => {
        if (!container) return

        const step = getScrollStep() * 1 // например 2 карточки

        container.scrollBy({
            left: step,
            behavior: 'smooth'
        })
    }

    const scrollPrev_mobile = () => {
        if (!container) return

        const step = getScrollStep() * 1

        container.scrollBy({
            left: -step,
            behavior: 'smooth'
        })

    }


    const [tarifFilter, setTarifFilter] = useState({
        internetPlans: false,
        iptvPlans: false,
        ktvPlans: false,
        additionalsPlans: false
    })
    const [filteredPlans, seFilteredPlans] = useState([...allOffers_plans])

    useEffect(() => {
        console.log('обновляюсь!!')
        seFilteredPlans(allOffers_plans.filter(plan => {
            // если фильтры вообще не выбраны — показываем всё
            const activeFilters = Object.entries(tarifFilter)
                .filter(([_, value]) => value)
                .map(([key]) => key)

            if (activeFilters.length === 0) return true

            // 1️⃣ ВСЕ выбранные фильтры должны быть в плане
            if (tarifFilter.internetPlans && !plan.services.includes('internet')) return false
            if (tarifFilter.iptvPlans && !plan.services.includes('iptv')) return false
            if (tarifFilter.ktvPlans && !plan.services.includes('ktv')) return false
            if (tarifFilter.additionalsPlans && !plan.plan_additionals.length) return false
            if (tarifFilter.additionalsPlans && plan.plan_additionals.length) return true

            // 2️⃣ НЕ должно быть невыбранных сервисов
            //if (!tarifFilter.iptvPlans && plan.services.includes('iptv')) return false
            //if (!tarifFilter.ktvPlans && plan.services.includes('ktv')) return false

            return true
        }))
    }, [tarifFilter, offers])

    const { ref, inView } = useInView();

    function setFilter(key){
        //Не даем выбрать ЦТВ и КТВ одновременно
        if (key == 'iptvPlans') {
            setTarifFilter(prev => ({
                ...prev,
                [key]: !prev[key],
                ktvPlans: false
            }))
        }else if (key == 'ktvPlans') {
            setTarifFilter(prev => ({
                ...prev,
                [key]: !prev[key],
                iptvPlans: false
            }))
        }else{
            setTarifFilter(prev => ({
                ...prev,
                [key]: !prev[key]
            }))
        }
    }

    return (
        <section className="allOffers" id='allOffers'>
        <h2 className="allOffers-title">
            <span className="decor decor-1"></span>
            <span className="decor decor-2"></span>
            <span className="decor decor-3"></span>
            <span className="decor decor-4"></span>
            <span className="decor decor-5"></span>
            <span className="text">Все тарифные планы</span>
            
        </h2>
        <AllOffers_Filter setFilter={setFilter} tarifFilter={tarifFilter} allOffers_plans={allOffers_plans}/>
        <div className="allOffers-wrapper">
            <button
            className="allOffers-navButton"
            onClick={scrollPrev}
            disabled={!canPrev}
            >
            ◀
            </button>
            <div className="allOffers-navButtons-mobile">
            <button
            className="allOffers-navButton mobile"
            onClick={scrollPrev_mobile}
            disabled={!canPrev}
            >
            ◀
            </button>
            <button
            className="allOffers-navButton mobile"
            onClick={scrollNext_mobile}
            disabled={!canNext}
            >
            ▶
            </button>
            </div>
            <div
            className="allOffers-container"
            ref={el => {
                if (!el) return
                setContainer(el)
                el.addEventListener('scroll', updateButtons)
                updateButtons()
            }}
            onMouseDown={onMouseDown}
            >
            <div className={`allOffers-track ${inView ? 'visible' : ''}`} ref={ref}>
                {filteredPlans.length ? filteredPlans.map(plan => (
                <AllOffers_Item
                    key={plan.id}
                    toggleFieldById = {toggleFieldById}
                    setActiveOffer={setActiveOffer}
                    activeCity={props.activeCity}
                    openModal={props.openModal} 
                    pluralize={props.pluralize}
                    icons={props.icons}
                    plan={plan}
                />
                )) : (
                    <div className='allOffers-notFound'>
                        <img src={props.logo_small} />
                        <span>
                            Таких тарифов не нашлось. <br />
                            Попробуйте изменить фильтр.
                        </span>
                    </div>
                )}
            </div>
            </div>

            <button
            className="allOffers-navButton"
            onClick={scrollNext}
            disabled={!canNext}
            >
            ▶
            </button>
        </div>
        </section>
    )
}

export default AllOffers
