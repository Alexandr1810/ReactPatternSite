import React, {useState, useEffect} from 'react'
import axios from "axios";
import {server_config} from '@/app/utils/server_config'

function Questions(props) {
  const [questions_items, setQuestions_items] = useState([])
    useEffect(()=>{
        setQuestions_items([...props.questions_items])
    },[])

function handleChange(e) {
    const { id, name, value, checked } = e.target;
    setQuestions_items(prev =>
    prev.map(item =>
        item.id === Number(id)
        ? {...item, [name.replace('_checkbox', '')]: name.includes('checkbox') ? Number(checked) : value }
        : item
    )
    );
}
function delItem(id){
    setQuestions_items(prev =>
        prev.filter(city => city.id !== id)
    )
}
function addItem(){
    setQuestions_items(prev =>
    [...prev, {
        id: prev[prev.length-1] ? prev[prev.length-1].id+1 : 0,
        city: '',
        region: ''
    }]
    )
}

  async function saveQuestions(){
    try{
        console.log(questions_items)
        const isValid = props.validateRequiredFields(questions_items, ['answer', 'question']);

        if (!isValid) {
            alert(`Не все поля заполнены!`)
            return;
        }
        await axios.post(`http://${server_config.site_folder}/back/update/questions/${server_config.site_key}`, {
            questions_items: questions_items,
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
        <h2 className='sectionTitle'>Частые вопросы</h2>
        <div className='sectionContent' id="faq">
          <div className='cities-data'>
              <h3>Список вопросов</h3>
              {questions_items.map((item)=>(
                <div className='cities-data-item' alt={item.id} key={item.id}>
                  <label className='textarea-label'><span className='label-title'>Вопрос:</span>
                  <input type='text' id={item.id} name='question' placeholder='Вопрос' value={item.question} onChange={handleChange} /></label>
                  <label className='textarea-label'><span className='label-title hasDescription'>Ответ для выпадающего блока:
                    <div className='label-decription'>В этом блоке вы можете использовать ссылки из списка сокращений что бы вставить заранее прописанное значение или функцию.</div></span>
                  <textarea type='text' id={item.id} name='answer' placeholder='Ответ' value={item.answer} onChange={handleChange} /></label>
                  <button className='delIcon-Button' onClick={()=>delItem(item.id)}></button>
                </div>
              ))}
          </div>
          <div className='cities-buttons'>
            <button className='addIcon-Button' onClick={addItem}></button>
            <button className='saveIcon-Button' onClick={saveQuestions}></button>
          </div>
        </div>
        
    </section>
  );
}

export default Questions;