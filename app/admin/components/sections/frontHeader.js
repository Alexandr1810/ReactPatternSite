import React, {useState, useEffect} from 'react'
import axios from "axios";
import {server_config} from '@/app/utils/server_config'

function FrontHeader(props) {
  const [hideSupportPhone, setHideSupportPhone] = useState(null)
  const [header_links, setHeader_links] = useState([])

  useEffect(()=>{
    setHideSupportPhone(props.site_config.hideSupportPhone)
    setHeader_links([...props.header_links])
  },[])

  function handleChange_header_links(e) {
    const { id, name, value, checked } = e.target;
    console.log(id, name, value, checked)
    setHeader_links(prev =>
      prev.map(item =>
        item.id === Number(id)
          ? { ...item, [name.replace('_checkbox', '')]: name.includes('checkbox') ? Number(checked) : value }
          : item
      )
    );
  }
  function handleChange_hideSupportPhone(e) {
    const { checked } = e.target;
    setHideSupportPhone(Number(checked));
  }

  async function saveHeaderLinks(params) {
    try{
      console.log(header_links)
      console.log(hideSupportPhone)
      const isValid = props.validateRequiredFields(header_links, [
        'title',
        'modal_title',
        'ym_reachGoal'
      ]);
      if (!isValid) {
        alert(`Не все поля заполнены!`)
        return;
      }
      await axios.post(`${server_config.api_protocol}://${server_config.site_folder}/back/update/site_config/${server_config.site_key}`, {
        site_config: {
          hideSupportPhone: String(hideSupportPhone)
        }
      },{
        withCredentials: true
      }).then((response) => {
          console.log(response)
      }).catch((error) => {
        console.error(error)
        props.showAlert("errorAlert")
      })

      await axios.post(`${server_config.api_protocol}://${server_config.site_folder}/back/update/headerLinks/${server_config.site_key}`, {
        header_links: header_links
      },{
        withCredentials: true
      }).then((response) => {
        console.log(response)
          props.showAlert("successAlert")
      }).catch((error) => {
        console.error(error)
        props.showAlert("errorAlert")
      })
    }
    catch(error){
        console.error(error)
        props.showAlert("errorAlert")
    }
  }

  return (
    <section>
        <h2 className='sectionTitle'>Шапка сайта</h2>
        <div className='sectionContent' id="frontHeader">
            <div className='headerLinks-data'>
                <h3>Формы в шапке:</h3>
                <div className='headerLinks-data-container'>
                    {header_links.map((item, index)=>(
                    <div className='headerLinks-data-item' key={index}>
                        <label><span className='label-title'>Тайтл:</span>
                        <input type='text' name='title' id={item.id} value={item.title} placeholder='Для меня' onChange={handleChange_header_links} />
                        </label>
                        <label><span className='label-title'>Заголовок формы:</span>
                        <input type='text' name='modal_title' id={item.id} value={item.modal_title} placeholder='Интернет в квартиру' onChange={handleChange_header_links} />
                        </label>
                        <label><span className='label-title'>Цель: (Яндект метрика)</span>
                        <input type='text' name='ym_reachGoal' id={item.id} value={item.ym_reachGoal} placeholder='fiz-lico-form' onChange={handleChange_header_links} />
                        </label>
                        <label className='f-right'><span className='label-title'>Показывать:</span>
                        <input type='checkbox' name='active_checkbox' id={item.id} checked={item.active} onChange={handleChange_header_links} />
                        </label>
                        <label className='f-right'><span className='label-title'>Свечение:</span>
                        <input type='checkbox' name='light_checkbox' id={item.id} checked={item.light} onChange={handleChange_header_links} />
                        </label>
                    </div>
                    ))}
                </div>
            </div>
            <div className='HideSupportPhone-data'>
                <h3>Прятать номер техподдержки:</h3>
                <div className='HideSupportPhone-data-container'>
                    <label>
                    <input type='checkbox' checked={Number(hideSupportPhone)} onChange={handleChange_hideSupportPhone}/>
                    <span id={Number(hideSupportPhone) ? "supportPhone" : ""}>{props.site_config.support_phone}</span>
                    </label>
                </div>
            </div>
            <div className='cities-buttons'>
                <button className='saveIcon-Button' type='button' onClick={saveHeaderLinks}></button>
            </div>
        </div>        
    </section>
  );
}


export default FrontHeader;