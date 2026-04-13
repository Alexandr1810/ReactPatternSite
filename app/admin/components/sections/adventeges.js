import React, {useState, useEffect} from 'react'
import axios from "axios";
import {server_config} from '@/app/utils/server_config'

function Adventeges(props) {
  const [adventages_items, setAdventages_items] = useState([])
  const [active_addImage_item, setActive_addImage_item] = useState(null)

  useEffect(()=>{
    console.log(props.adventages_items)
    let adventages_items_temp = [
      ...props.adventages_items
    ]
    
    adventages_items_temp.forEach((item) => {
      item.image = `${server_config.api_host}/uploads/${server_config.site_key}/advantages/${item.original_image}`
    })
    setAdventages_items([...props.adventages_items])
  },[])

  function handleChange(e) {
    const { id, name, value, checked } = e.target;
    console.log(id, name, value, checked)
    setAdventages_items(prev =>
      prev.map(item =>
        item.id === Number(id)
          ? {...item, [name.replace('_checkbox', '')]: name.includes('checkbox') ? Number(checked) : value }
          : item
      )
    );
  }

  function replaceArrayField(arr, index, value){
    let newArr = [...arr];
    newArr[index] = value
    return newArr;
  }
  function handleItems(e) {
    const { id, name, value } = e.target;
    console.log(id, name, value)
    setAdventages_items(prev =>
      prev.map(item =>
        item.id === Number(id)
          ? {...item, items: replaceArrayField(item.items, Number(name), value)}
          : item
      )
    );
  }
  function setImage(slide_id, image_name, image_src){
    console.log(slide_id, image_name, image_src)
    console.log(adventages_items[0].original_image)
    setAdventages_items(prev =>
      prev.map(item =>
        item.id === Number(slide_id)
          ? {...item, original_image: image_name, image: image_src}
          : item
      )
    );
  }
  console.log(adventages_items)

  async function saveAdventeges(){
    try{
        console.log(adventages_items)
        const isValid = props.validateRequiredFields(adventages_items, ['title', 'items']);

        if (!isValid) {
            alert(`Не все поля заполнены!`)
            return;
        }
        await axios.post(server_config.api_host+`/back/update/adventages/${server_config.site_key}`, {
            adventages_items: adventages_items,
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
        <h2 className='sectionTitle'>Преимущества</h2>
        <div className='sectionContent' id="adventeges">
            {adventages_items.map((item, index)=>(
                <div className="slider-item" key={index}>
                    <div className='left-side f-column'>
                        <div className='top-side f-row'>
                            <div className={item.id === active_addImage_item ? 'imgContainer sliderImage active': 'imgContainer sliderImage'} onClick={()=>{item.id === active_addImage_item ? setActive_addImage_item(null) : setActive_addImage_item(item.id)}}>
                                <img src={item.image} />  
                                <div className='allImagesContainer'>
                                    {props.advantagesImages.map((image, index) =>(
                                        <div className='imgContainer plus white' onClick={()=>setImage(item.id, image.name, image.src)} key={index}>
                                            <img key={image.name} alt={image.name} src={image.src} />  
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <label><span className='label-title'>Заголовок:</span>
                            <input type='text' id={item.id} name='title' placeholder="Заголовок" value={item.title} onChange={handleChange} /></label>
                        </div>
                        <span className='label-title hasDescription'><b>Описание (Список)</b>
                            <div className='label-decription'>В этом блоке вы можете использовать ссылки из списка сокращений что бы вставить заранее прописанное значение или функцию.</div>
                        </span>
                        <div className='middle-side'>
                            {item.items.map((inner_item, index)=>(
                                <div className='middle-side-item' key={index}>
                                    <textarea type='text' id={item.id} name={index} placeholder='Описание' value={inner_item} onChange={handleItems}  />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <div className='cities-buttons'>
                <button className='saveIcon-Button' type='button' onClick={saveAdventeges}></button>
            </div>
        </div>
    </section>
  );
}

export default Adventeges;