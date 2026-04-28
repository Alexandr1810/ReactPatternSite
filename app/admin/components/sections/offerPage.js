import React, {useState, useEffect} from 'react'
import axios from "axios";
import {server_config} from '@/app/utils/server_config'

function OfferPage(props) {
  const [descriptions_items, setDescriptions_items] = useState([])
    useEffect(()=>{
        setDescriptions_items([...props.OfferDescriptions_items])
    },[])

function handleChange(e) {
    const { id, name, value, checked } = e.target;
    setDescriptions_items(prev =>
    prev.map(item =>
        item.id === Number(id)
        ? {...item, [name.replace('_checkbox', '')]: name.includes('checkbox') ? Number(checked) : value }
        : item
    )
    );
}
function delItem(id){
    setDescriptions_items(prev =>
        prev.filter(city => city.id !== id)
    )
}
function addItem(){
    setDescriptions_items(prev =>
    [...prev, {
        id: prev[prev.length-1] ? prev[prev.length-1].id+1 : 0,
        city: '',
        region: ''
    }]
    )
}


  async function saveOfferPage(){
    try{
        console.log(descriptions_items)
        const isValid = props.validateRequiredFields(descriptions_items, ['title', 'description']);

        if (!isValid) {
            alert(`Не все поля заполнены!`)
            return;
        }
        await axios.post(`http://${server_config.site_folder}/back/update/OfferDescriptions/${server_config.site_key}`, {
            descriptions_items: descriptions_items,
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
        <h2 className='sectionTitle'>Страница тарифа</h2>
        <div className='sectionContent' id="offerPage">
          <div className='cities-data'>
              <h3>Дополнения к тарифу</h3>
              {descriptions_items.map((item)=>(
                <div className='cities-data-item' alt={item.id} key={item.id}>
                  <label><span className='label-title'>Заголовок:</span>
                  <input type='text' id={item.id} name='title' placeholder='Закоголовок' value={item.title} onChange={handleChange} /></label>
                  <label className='textarea-label'><span className='label-title hasDescription'>Описание для выпадающего блока:
                    <div className='label-decription'>В этом блоке вы можете использовать ссылки из списка сокращений что бы вставить заранее прописанное значение или функцию. <br /> В этом блоке так же доступны html теги, например '<code>&lt;br /&gt;</code>' для переноса строки</div></span>
                  <textarea type='text' id={item.id} name='description' placeholder='Описание' value={item.description} onChange={handleChange} /></label>
                  <button className='delIcon-Button' onClick={()=>delItem(item.id)}></button>
                </div>
              ))}
          </div>
          <div className='cities-buttons'>
            <button className='addIcon-Button' onClick={addItem}></button>
            <button className='saveIcon-Button' onClick={saveOfferPage}></button>
          </div>
        </div>
        
    </section>
  );
}

export default OfferPage;