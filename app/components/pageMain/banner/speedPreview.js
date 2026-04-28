'use client'

import React, { useEffect, useRef, useState } from 'react';
import { pluralize } from '@/app/utils/functions'
import { useGlobalContext } from '@/app/utils/globalContext'

function SpeedPreview({site_config, activeCity, logo_small}) {
  const { offers } = useGlobalContext() 
  console.log(123)
  console.log(site_config)

  const filteredPlans = offers.filter(p => p.speed >= 100);

  const speeds = filteredPlans.map(p => p.speed);

  const MIN_SPEED = Math.min(...speeds);
  const MAX_SPEED = Math.max(...speeds);

  const blockRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const speedRatio = Math.round(MAX_SPEED / MIN_SPEED);

  const startAnimation = () => {
    setAnimate(false);
    setAnimationKey(prev => prev + 1); // 💥 remount
    requestAnimationFrame(() => {
      setAnimate(true);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (blockRef.current) observer.observe(blockRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="infoSection" id='infoSpeedPreview'>
      <div className="speedPreview" >
        {MIN_SPEED !== MAX_SPEED && 
          <div className="speedPreview-container">
            <div className="speedPreview-block" ref={blockRef}>
                <div className="speedPreview-header" >
                    <h3 className="speedPreview-title">
                        Что такое Гигабит на практике?
                    </h3>
                    <h3 className="speedPreview-title-mobile">
                        Гигабит в <span className='accent'>{speedRatio}</span> {pluralize(speedRatio, 'раз', 'раза', 'раз')} быстрее!
                    </h3>
                </div>
        
                <div className="speedPreview-block-inner">
                    <div className="speedPreview-bars" key={animationKey}>
                        {/* MIN */}
                        <div className="speedBar">
                        <span className="speedLabel">{MIN_SPEED} Мбит/с</span>
                        <div className={`speedTrack min ${animate ? 'active' : ''}`}>
                            <div className={`speedFill ${animate ? 'active' : ''}`} />
                            </div>
                        </div>

                        {/* MAX */}
                        <div className="speedBar">
                            <span className="speedLabel">{MAX_SPEED} Мбит/с</span>
                            <div className={`speedTrack max ${animate ? 'active' : ''}`}>
                                <div className={`speedFill ${animate ? 'active' : ''}`} />
                            </div>
                        </div>
                    </div>

                    <div className="speedPreview-info">
                        <span className='big'>В <span className='accent'>{speedRatio}</span> {pluralize(speedRatio, 'раз', 'раза', 'раз')}</span>
                        <span className='small'>Быстрее!</span>
                    </div>
                    
                </div>
                {/* <button className="speedReplayBtn" onClick={startAnimation}>
                        Повторить анимацию
                    </button> */}
            </div>
            <div className="speedPreview-logoBlock">
              <img src={logo_small} alt={Number(site_config.show_city) ?
                `Логотип ${site_config.genitive_provider_name} - интернет-провайдер в г.${activeCity.city}`
                :
                `Логотип ${site_config.genitive_provider_name}`
              } />
              {!Number(site_config.hideProviderName_onBanner) && (<span>{site_config.provider_name}</span>)}
            </div>
          </div>
        }
      </div>
    </section>
  );
}

export default SpeedPreview;
