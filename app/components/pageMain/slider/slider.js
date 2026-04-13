'use client'

import React, {useState, useRef, useEffect} from 'react'
import Form from '../../dealForm'
import Slide from './slide'
import SliderNav from './slider_nav'


function Slider({slider_slides, activeCity, provider_name, reachGoals}){

    const [state, setState] = useState({
        slider: [...slider_slides.filter(slide => slide.visible)],
        activeSlide: 0,
        topLayer: "A",
    });

    const intervalRef = useRef(null);

    // безопасно вычисляем и применяем следующий слайд, не читая state напрямую
    const nextSlide = () => {
        setState((prev) => {
        const next =
            prev.activeSlide !== prev.slider.length - 1 ? prev.activeSlide + 1 : 0;

        // лог здесь — он получит актуальные prev
        //console.log("prev.activeSlide", prev.activeSlide, "next", next);

        return {
            ...prev,
            activeSlide: next,
            topLayer: prev.topLayer === "A" ? "B" : "A",
        };
        });
    };

    function startInterval() {
        // очистим старый, если есть
        if (intervalRef.current) clearInterval(intervalRef.current);

        // ставим новый — он вызывает nextSlide (который использует функциональное setState)
        intervalRef.current = setInterval(() => {
        nextSlide();
        }, 5000);
    }

    useEffect(() => {
        startInterval(); // запустить при маунте

        return () => {
        if (intervalRef.current) clearInterval(intervalRef.current); // очистка при анмаунте
        };
        // пустой deps → один раз при маунте
    }, []);

    // если нужно логировать новое состояние — делаем это через useEffect по зависимостям
    useEffect(() => {
        //console.log("STATE UPDATED", state);
    }, [state.activeSlide, state.topLayer]);

    // ручное переключение (например, по кнопке)
    function setSlide(slide_id) {
        setState((prev) => ({
        ...prev,
        activeSlide: slide_id,
        topLayer: prev.topLayer === "A" ? "B" : "A",
        }));

        // "сброс" интервала после ручного переключения
        if (intervalRef.current) clearInterval(intervalRef.current);
        startInterval();
    }

    const { slider } = state;
    const { activeSlide, topLayer } = state;

    return(
        <section className='slider'>
            {/* нижний слой */}
            <div
            className="bg-layer"
            style={{
                background: slider[activeSlide].background,
                opacity: topLayer === 'A' ? 0 : 1
            }}
            />
            {/* верхний слой */}
            <div
            className="bg-layer"
            style={{
                background: slider[activeSlide].background,
                opacity: topLayer === 'A' ? 1 : 0
            }}
            />

            <div className='slider-topBlock'>
                <div className='slider-textBlock'>
                    {
                        slider.map((slide, index) => (
                            <Slide 
                                key={slide.id} 
                                index={index} 
                                slide={slide} 
                                activeSlide={activeSlide} 
                                activeCity={activeCity.city} 
                                provider_name={provider_name}
                            />
                        ))
                    }
                </div>
                
                <div className='slider-formBlock'>
                    <h1 className='slider-formBlock-title'>Подключить {provider_name} в городе {activeCity.city}</h1>
                    <Form 
                        reachGoal="mainForm" 
                        reachGoals={reachGoals}
                        formId="mainModalForm" 
                        formName="Главная (Оставить заявку)" 
                        activeCity={activeCity.city} 
                    />
                </div>
            </div>
            <div className='slider-bottomBlock'>
                <div className='slider-nav'>
                    {
                        slider.map((slide, index) => (
                            <SliderNav 
                                key={slide.id} 
                                index={index} 
                                slide={slide} 
                                activeSlide={activeSlide} 
                                on_setSlide={setSlide}
                                activeCity={activeCity}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )



    
}
export default Slider;