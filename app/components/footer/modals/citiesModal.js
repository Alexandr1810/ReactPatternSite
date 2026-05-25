'use client'

import React, {useState} from 'react'

function СitiesModal({icons, cities_list, cities_list_original, activeCity, closeModal}){

    return(
        <div className='modal' id="citiesModal">
            <div className='modal-background modal-fade' onClick={()=>closeModal('citiesModal')} ></div>
            <div className='modal-content modal-fade'>
                <div className='modal-header'>
                    <span className='modal-header-title'>Ваш город:</span>
                    <img className='modal-header-close' onClick={()=>closeModal('citiesModal')} src={icons.close_icon} />
                </div>
                <div className='cities-list'>
                    <div className='cities-block_main'>
                        <div className='cities-block'>
                            <a className='city-block'>Архангельск</a>
                            <a className='city-block'>Астрахань</a>
                            <a className='city-block'>Абакан</a>
                            <a className='city-block'>Бийск</a>
                            <a className='city-block'>Брянск</a>
                            <a className='city-block'>Курск</a>
                            <a className='city-block'>Владивосток</a>
                            <a className='city-block'>Волгоград</a>
                            <a className='city-block'>Псков</a>
                            <a className='city-block'>Энгельс</a>
                            <a className='city-block'>Калининград</a>
                            <a className='city-block'>Вологда</a>
                            <a className='city-block'>Мурманск</a>
                            <a className='city-block'>Петрозаводск</a>
                            <a className='city-block'>Великий Новгород</a>
                            <a className='city-block'>Киров</a>
                            <a className='city-block'>Красноярск</a>
                            <a className='city-block'>Южно-Сахалинск</a>
                            <a className='city-block'>Петропавловск-Камчатский</a>
                            <a className='city-block'>Сызрань</a>
                            <a className='city-block'>Норильск</a>
                            <a className='city-block'>Миасс</a>
                            <a className='city-block'>Махачкала</a>
                            <a className='city-block'>Тула</a>
                            <a className='city-block'>Тверь</a>
                            <a className='city-block'>Каменск-Уральский</a>
                            <a className='city-block'>Липецк</a>
                            <a className='city-block'>Новый Уренгой</a>
                            <a className='city-block'>Воронеж</a>
                            <a className='city-block'>Рязань</a>
                            <a className='city-block'>Орёл</a>
                            <a className='city-block'>Ижевск</a>
                            <a className='city-block'>Иваново</a>
                            <a className='city-block'>Пенза</a>
                            <a className='city-block'>Оренбург</a>
                            <a className='city-block'>Астрахань</a>
                            <a className='city-block'>Кемерово</a>
                            <a className='city-block'>Горно-Алтайск</a>
                            <a className='city-block'>Хабаровск</a>
                            <a className='city-block'>Южно-Сахалинск</a>
                            <a className='city-block'>Йошкар-Ола</a>
                            <a className='city-block'>Сургу</a>
                            <a className='city-block'>Курган</a>
                            <a className='city-block'>Тольятти</a>
                            <a className='city-block'>Самара</a>
                            <a className='city-block'>Комсомольско-на-амуре</a>
                            <a className='city-block'>Якутск</a>
                            <a className='city-block'>Магнитогорск</a>
                            <a className='city-block'>Уфа</a>
                            <a className='city-block'>Челябинск</a>
                            <a className='city-block'>Томск</a>
                            <a className='city-block'>Нижневартовск</a>
                            <a className='city-block'>Новокузнецк</a>
                            <a className='city-block'>Нижний-Тагил</a>
                            <a className='city-block'>Нижний-Новгород</a>
                            <a className='city-block'>Набережные челны</a>
                            <a className='city-block'>Чита</a>
                            <a className='city-block'>Братск</a>
                            <a className='city-block'>Сочи</a>
                            <a className='city-block'>Сыктывкар</a>
                            <a className='city-block'>Краснодар</a>
                            <a className='city-block'>Ростов-на-дону</a>
                            <a className='city-block'>Пермь</a>
                            <a className='city-block'>Ульяновск</a>
                            <a className='city-block'>Воткинск</a>
                            <a className='city-block'>Казань</a>
                            <a className='city-block'>Ярославль</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default СitiesModal;