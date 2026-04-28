import axios from "axios";
import {server_config} from '@/app/utils/server_config'
import React, {useState, useEffect} from 'react'

function Slider(props) {
  const [slider_slides, setSlider_slides] = useState([])
  const [active_addIcon_item, setActive_addIcon_item] = useState(null)
  const [active_addImage_item, setActive_addImage_item] = useState(null)

  useEffect(()=>{
    console.log(props.slider_slides)
    setSlider_slides([...props.slider_slides])
  },[])

  function handleChange(e) {
    const { id, name, value, checked } = e.target;
    console.log(id, name, value, checked)
    setSlider_slides(prev =>
      prev.map(item =>
        item.id === Number(id)
          ? {...item, [name.replace('_checkbox', '')]: name.includes('checkbox') ? Number(checked) : value }
          : item
      )
    );
  }
  function delIcon(slide_id, icon_name, icon_src) {
    console.log(slide_id, icon_name, icon_src)
    console.log(slider_slides[0].original_icons)
    console.log(slider_slides[0].icons)

    setSlider_slides(prev =>
      prev.map(item =>
        item.id === Number(slide_id)
          ? {...item, original_icons: item.original_icons.filter(icon => icon !== icon_name.replace('.svg', '')), icons: item.icons.filter(icon => icon !== icon_src)}
          : item
      )
    );
  }
  function addIcon(slide_id, icon_name, icon_src){
    console.log(slide_id, icon_name, icon_src)
    console.log(slider_slides[0].original_icons)
    setSlider_slides(prev =>
      prev.map(item =>
        item.id === Number(slide_id)
          ? {...item, original_icons: [...item.original_icons, icon_name.replace('.svg', '')], icons: [...item.icons, icon_src]}
          : item
      )
    );
  }
  function setImage(slide_id, image_name, image_src){
    console.log(slide_id, image_name, image_src)
    console.log(slider_slides[0].original_images)
    setSlider_slides(prev =>
      prev.map(item =>
        item.id === Number(slide_id)
          ? {...item, original_image: image_name, image: image_src}
          : item
      )
    );
  }
  function setVisible(slide_id, visible){
    console.log(slide_id, visible)
    setSlider_slides(prev =>
      prev.map(item =>
        item.id === Number(slide_id)
          ? {...item, visible: visible}
          : item
      )
    );
  }
  async function saveSlider(){
    try{
        console.log(slider_slides)
        const isValid = props.validateRequiredFields(slider_slides, ['title']);

        if (!isValid) {
            alert(`Не все поля заполнены!`)
            return;
        }
        await axios.post(`http://${server_config.site_folder}/back/update/slider_slides/${server_config.site_key}`, {
            slider_slides: slider_slides,
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
        <h2 className='sectionTitle'>Главный слайдер</h2>
        <div className='sectionContent' id="slider">
            {slider_slides.map((item, index)=>(
                <div className="slider-item" key={index}>
                    <div className='left-side'>
                        <div className={item.id === active_addImage_item ? 'imgContainer sliderImage active': 'imgContainer sliderImage'} onClick={()=>{item.id === active_addImage_item ? setActive_addImage_item(null) : setActive_addImage_item(item.id)}}>
                            <img src={item.image} />  
                            <div className='allImagesContainer'>
                                {props.allSliderImages.map((image, index) =>(
                                    <div className='imgContainer plus white' onClick={()=>setImage(item.id, image.name, image.src)} key={index}>
                                        <img key={image.name} alt={image.name} src={image.src} />  
                                    </div>
                                ))}
                            </div>
                        </div>
                        <label><span className='label-title'>Название слайда:</span>
                        <input type='text' id={item.id} name='title' placeholder="Домашний интернет" value={item.title} onChange={handleChange} /></label>
                        <div><span className='label-title'>Иконки:</span>
                            <div className='iconsContainer'>
                                {item.original_icons.map((icon, index) =>
                                    <div className='imgContainer del' onClick={()=>delIcon(item.id, icon, item.icons[index])} key={index}>
                                        <img src={item.icons[index]} />
                                    </div>
                                )}
                                <div className={item.id === active_addIcon_item ? 'addIcon active': 'addIcon'} onClick={()=>{item.id === active_addIcon_item ? setActive_addIcon_item(null) : setActive_addIcon_item(item.id)}}>
                                    <div className='allIconsContainer'>
                                        {props.allIcons.map((icon, index) =>(
                                            <div className='imgContainer plus' onClick={()=>addIcon(item.id, icon.name, icon.src)} key={index}>
                                                <img key={icon.name} alt={icon.name} src={icon.src} />  
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-side'>
                        <button type='button' className={!item.visible ? 'visibleIcon-Button active' : 'visibleIcon-Button'} onClick={()=> setVisible(item.id, !item.visible)}></button>
                    </div>
                </div>
            ))}
            <div className='cities-buttons'>
                <button className='saveIcon-Button' type='button' onClick={saveSlider}></button>
            </div>
        </div>
    </section>
  );
}

export default Slider;