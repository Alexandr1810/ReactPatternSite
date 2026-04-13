'use client';

import React, { useState, useEffect, useRef } from 'react'
import { useInView } from '../../hooks/useInView';

function OfferDescriptionText(props){
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
    console.log(props.activeOffer.plan_additionals)
    console.log(props.icons.additionals)
    return(
        <div className={`offerDescription-item ${isActive === 'active' ? 'active' : ''}`} ref={ref}>
            <span className="offerDescription-item-title" onClick={() => setIsActive(isActive === 'active' ? null : 'active')}>Тариф {props.activeOffer.name}</span>
            <div className="offerDescription-item-content" ref={itemRef}>
                <div>
                    <b>Описание тарифа:</b><br /><br />
                    Тариф {props.activeOffer.name} от {props.genitive_provider_name} - это идеальное решение для тех, кто ценит высокоскоростной интернет и широкий выбор телеканалов. Этот тарифный план предоставляет быстрый и стабильный доступ к интернету.
                    <br /><br />
                    <b>Характеристики тарифа:</b>
                    {props.activeOffer.services.includes('internet') !== "" && (
                        <p>
                            <br />
                            - Скорость интернета - {props.activeOffer.speed} Мбит/сек: Наслаждайтесь мгновенной загрузкой страниц, стримингом видео в высоком разрешении без задержек и стабильной работой всех ваших устройств. Скорость тарифа идеальна для семей, где интернетом пользуются одновременно несколько человек, работы из дома или онлайн игр.
                        </p>
                    )}
                    {(props.activeOffer.services.includes('iptv') || props.activeOffer.services.includes('ktv')) && (
                        <p>
                        <br />
                        - Количество телеканалов - {props.activeOffer.tv}: В тариф включено множество телеканалов, среди которых спортивные, новостные, развлекательные и детские каналы. Вы сможете смотреть любимые телешоу, фильмы и программы в высоком качестве.
                        </p>
                    )}
                    
                    {props.activeOffer.plan_additionals.length > 0 &&
                        <p>
                            <br />
                            <b>Преимущества и бонусы:</b>
                            <br /><br />
                            - В тариф входят подписки на {props.activeOffer.plan_additionals.map((item) => props.icons.additionals.find(additional => additional.id === item).name+', ')} Получите доступ к премиальным видеосервисам без дополнительной платы. Наслаждайтесь эксклюзивными сериалами, новыми фильмами, шоу и классикой кинематографа. Смотрите контент, который вам нравится, без рекламы и с возможностью выбора озвучки и субтитров.
                            </p>
                    }
                    <br />
                    <b>Преимущества {props.genitive_provider_name}:</b>
                    <br /><br />
                    - Надежность и качество: Компания {props.provider_name} гарантирует высокое качество предоставляемых услуг, что подтверждается многолетним опытом и доверием тысяч пользователей.
                    <br /><br />
                    - Поддержка клиентов: Круглосуточная служба поддержки всегда готова помочь в решении любых вопросов, связанных с подключением и использованием услуг.
                    <br /><br />
                    - Выгодные акции и предложения: {props.provider_name} регулярно радует своих клиентов специальными предложениями и акциями, что делает их услуги ещё более привлекательными.
                    <br />
                    <br />
                    Тариф "{props.activeOffer.name}" от {props.genitive_provider_name} - это оптимальный выбор для тех, кто ценит высокое качество, скорость и удобство. Подключайтесь и получайте максимум удовольствия от пользования интернетом и телевидением!
                    <br />
                    {props.activeOffer.connection_price > 0 && <span>Подключение в квартиру стоит {props.activeOffer.connection_price} руб единоразово.</span>}
                </div>
            </div>
        </div>
    )
}

export default OfferDescriptionText
