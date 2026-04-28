import axios from "axios";
import React, {useState, useEffect, useRef} from 'react'
import { site_config } from '@/app/utils/components-config';
import {server_config} from '@/app/utils/server_config'
function Mediateka(props) {
  const fileInputRef_icons = useRef(null);
  const fileInputRef_slider = useRef(null);
  const fileInputRef_additionals = useRef(null);
  const fileInputRef_advantages = useRef(null);

  const handleClick = (section) => {
    switch(section) {
    case 'icons':
        fileInputRef_icons.current.click();
        break;
    case 'slider':
        fileInputRef_slider.current.click();
        break;
    case 'additionals':
        fileInputRef_additionals.current.click();
        break;
    case 'advantages':
        fileInputRef_advantages.current.click();
        break;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    console.log(e.target.name)
    
    try {
      const res = await axios.post(`http://${server_config.site_folder}/upload/${server_config.site_key}/${e.target.name}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

    switch(e.target.name) {
        case 'icons':
            props.setAllIcons((prev) => [
                ...prev,
                {
                    name: res.data.filename,
                    src: `http://${server_config.site_folder}/uploads/${server_config.site_key}/${e.target.name}/${res.data.filename}`,
                },
            ]);
            break;
        case 'slider':
            props.setAllSliderImages((prev) => [
                ...prev,
                {
                    name: res.data.filename,
                    src: `http://${server_config.site_folder}/uploads/${server_config.site_key}/${e.target.name}/${res.data.filename}`,
                },
            ]);
            break;
        case 'additionals':
            props.setAdditionalsImages((prev) => [
                ...prev,
                {
                    name: res.data.filename,
                    src: `http://${server_config.site_folder}/uploads/${server_config.site_key}/${e.target.name}/${res.data.filename}`,
                },
            ]);
            break;
        case 'advantages':
            props.setAdvantagesImages((prev) => [
                ...prev,
                {
                    name: res.data.filename,
                    src: `http://${server_config.site_folder}/uploads/${server_config.site_key}/${e.target.name}/${res.data.filename}`,
                },
            ]);
            break;
    }
      
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <section>
        <h2 className='sectionTitle'>Медиатека</h2>
        <div className='sectionContent' id='media'>
            <h3>Иконки</h3>
            <div className='mediaSection'>
                <div className='imgContainer addImage' onClick={()=>handleClick("icons")}></div>
                <input
                    type="file"
                    ref={fileInputRef_icons}
                    style={{ display: "none" }}
                    accept=".svg,image/svg+xml"
                    name="icons"
                    onChange={handleFileChange}
                />
                {props.allIcons.map((icon, index) =>(
                    <div className='imgContainer noneImage' key={index}>
                        <img key={icon.name} alt={icon.name} src={icon.src} />  
                    </div>
                ))}
            </div>

            <h3>Сдайдер</h3>
            <div className='mediaSection'>
                <div className='imgContainer addImage' onClick={()=>handleClick("slider")}></div>
                <input
                    type="file"
                    ref={fileInputRef_slider}
                    style={{ display: "none" }}
                    accept="image/*"
                    name="slider"
                    onChange={handleFileChange}
                />
                {props.allSliderImages.map((image, index) =>(
                    <div className='imgContainer noneImage' key={index}>
                        <img key={image.name} alt={image.name} src={image.src} />  
                    </div>
                ))}
            </div>
            
            <h3>Дополнения</h3>
            <div className='mediaSection'>
                <div className='imgContainer addImage' onClick={()=>handleClick("additionals")}></div>
                <input
                    type="file"
                    ref={fileInputRef_additionals}
                    style={{ display: "none" }}
                    accept="image/*"
                    name="additionals"
                    onChange={handleFileChange}
                />
                {props.additionalsImages.map((image, index) =>(
                    <div className='imgContainer noneImage' key={index}>
                        <img key={image.name} alt={image.name} src={image.src} />  
                    </div>
                ))}
            </div>
            
            <h3>Преимущества</h3>
            <div className='mediaSection'>
                <div className='imgContainer addImage' onClick={()=>handleClick("advantages")}></div>
                <input
                    type="file"
                    ref={fileInputRef_advantages}
                    style={{ display: "none" }}
                    accept="image/*"
                    name="advantages"
                    onChange={handleFileChange}
                />
                {props.advantagesImages.map((image, index) =>(
                    <div className='imgContainer noneImage' key={index}>
                        <img key={image.name} alt={image.name} src={image.src} />  
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}


export default Mediateka;