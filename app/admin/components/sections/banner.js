import axios from "axios";
import { server_config } from '@/app/utils/server_config'
import React, {useState, useEffect} from 'react'

function Banner(props) {
  const [banner_items, setBanner_items] = useState([])
  const [active_setIcon_item, setActive_setIcon_item] = useState(null)

  useEffect(()=>{
    setBanner_items([...props.banner_items])
  },[])

  function handleChange(e) {
    const { id, name, value, checked } = e.target;
    console.log(id, name, value, checked)
    setBanner_items(prev =>
      prev.map(item =>
        item.id === Number(id)
          ? {...item, [name.replace('_checkbox', '')]: name.includes('checkbox') ? Number(checked) : value }
          : item
      )
    );
  }
  function setIcon(item_id, icon_name, icon_src){
    console.log(banner_items)
    setBanner_items(prev =>
      prev.map(item =>
        item.id === Number(item_id)
          ? {...item, original_icon: icon_name.replace('.svg', ''), icon: icon_src}
          : item
      )
    );
  }
  function setVisible(item_id, visible){
    console.log(item_id, visible)
    setBanner_items(prev =>
      prev.map(item =>
        item.id === Number(item_id)
          ? {...item, visible: visible}
          : item
      )
    );
  }
  async function saveBanner(){
    try{
        console.log(banner_items)
        const isValid = props.validateRequiredFields(banner_items, ['title', 'text']);

        if (!isValid) {
            alert(`Не все поля заполнены!`)
            return;
        }
        await axios.post(`http://${server_config.site_folder}/back/update/banner_items/${server_config.site_key}`, {
            banner_items: banner_items,
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
        <h2 className='sectionTitle'>Баннер преимуществ</h2>
        <div className='sectionContent' id="banner">
            {banner_items.map((item, index)=>(
                <div className="slider-item" key={index}>
                    <div className='left-side'>
                        <div><span className='label-title'>Иконка:</span>
                            <div className={item.id === active_setIcon_item ? 'imgContainer bannerImage active': 'imgContainer bannerImage'} onClick={()=>{item.id === active_setIcon_item ? setActive_setIcon_item(null) : setActive_setIcon_item(item.id)}}>
                                <img src={item.icon} />  
                                <div className='allIconsContainer'>
                                    {props.allIcons.map((icon, index) =>(
                                        <div className='imgContainer plus' onClick={()=>setIcon(item.id, icon.name, icon.src)} key={index}>
                                            <img key={icon.name} alt={icon.name} src={icon.src} />  
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <label><span className='label-title'>Заголовок:</span>
                        <input type='text' id={item.id} name='title' placeholder="Скорость" value={item.title} onChange={handleChange} /></label>
                    
                        <label><span className='label-title'>Текст:</span>
                        <textarea type='text' id={item.id} name='text' placeholder="Введите текст" value={item.text} onChange={handleChange} /></label>
                    </div>
                    <div className='right-side'>
                        <button type='button' className={!item.visible ? 'visibleIcon-Button active' : 'visibleIcon-Button'} onClick={()=> setVisible(item.id, !item.visible)}></button>
                    </div>
                </div>
            ))}
            <div className='cities-buttons'>
                <button className='saveIcon-Button' type='button' onClick={saveBanner}></button>
            </div>
        </div>
    </section>
  );
}

export default Banner;