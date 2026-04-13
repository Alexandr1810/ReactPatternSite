'use client'

import React, {useState, useEffect} from 'react'

function AllOffers_Filter(props){
    return(
        <div className='allOffers-filter'>
            <span className='allOffers-filter-preview'>В тарифе:</span>
            {props.allOffers_plans.filter(plan => plan.services.includes('internet')).length > 0 && 
            <label className='allOffers-filter-item'>
                <input onChange={()=>props.setFilter('internetPlans')} type='checkbox' checked={props.tarifFilter.internetPlans} />
                <span>Интернет</span>
            </label>}
            {props.allOffers_plans.filter(plan => plan.services.includes('iptv')).length > 0 && 
            <label className='allOffers-filter-item'>
                <input onChange={()=>props.setFilter('iptvPlans')} type='checkbox' checked={props.tarifFilter.iptvPlans}/>
                <span>Цифровое ТВ</span>
            </label>}
            {props.allOffers_plans.filter(plan => plan.services.includes('ktv')).length > 0 &&
            <label className='allOffers-filter-item'>
                <input onChange={()=>props.setFilter('ktvPlans')} type='checkbox' checked={props.tarifFilter.ktvPlans}/>
                <span>Кабельное ТВ</span>
            </label>}
            {props.allOffers_plans.filter(plan => plan.plan_additionals.length).length > 0 &&
            <label className='allOffers-filter-item'>
                <input onChange={()=>props.setFilter('additionalsPlans')} type='checkbox' checked={props.tarifFilter.additionalsPlans}/>
                <span>Кинотеатры</span>
            </label>}
        </div>
    )
}
export default AllOffers_Filter;