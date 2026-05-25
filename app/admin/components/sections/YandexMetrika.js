import React, {useState, useEffect} from 'react'
import axios from "axios";
import {server_config} from '@/app/utils/server_config'

function YandexMetrika(props) {
  console.log(props.reachGoals)
  const [reachGoals, setReachGoals] = useState([])
  useEffect(()=>{
    setReachGoals([...props.reachGoals])
  },[])

  function handleChange(e) {
    const { id, name, value, checked } = e.target;
    setReachGoals(prev =>
      prev.map(item =>
        item.id === Number(id)
          ? {...item, [name.replace('_checkbox', '')]: name.includes('checkbox') ? Number(checked) : value }
          : item
      )
    );
  }
  async function saveYandexMetrika(){
    try{
        console.log(reachGoals)
        const isValid = props.validateRequiredFields(reachGoals, ['parameter']);

        if (!isValid) {
            alert(`Не все поля заполнены!`)
            return;
        }
        await axios.post(`${server_config.api_protocol}://${server_config.site_folder}/back/update/YandexMetrika_config/${server_config.site_key}`, {
            reachGoals: reachGoals,
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
        <h2 className='sectionTitle'>Яндекс Метрка</h2>
        <div className='sectionContent' id="metrics">
          <div className='cities-data'>
              <h3>Цели:</h3>
              {reachGoals.map((item, index)=>(
                <div className='cities-data-item f-column' alt={item.id} key={item.id}>
                  <span><b>{index+1}. {item.description}</b></span>
                  <div className='f-row'>
                    <label><span className='label-title'>Параметр:</span>
                    <input type='text' id={item.id} name='parameter' placeholder='Параметр' value={item.parameter} onChange={handleChange} /></label>
                    <label><span className='label-title'>Значение:</span>
                    <input type='text' id={item.id} name='value' placeholder='Значение' value={item.value} onChange={handleChange} /></label>
                  </div>
                </div>
              ))}
          </div>
          <div className='cities-buttons'>
            <button className='saveIcon-Button' onClick={saveYandexMetrika}></button>
          </div>
        </div>
    </section>
  );
}


export default YandexMetrika;