import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import {server_config} from '@/app/utils/server_config'

function Metatags(props) {
  const [metaTags, setMetaTags] = useState({})
  const [OG_Image, setOG_Image] = useState()

  const fileInputRef_OG_Image = useRef(null)

  useEffect(()=>{
    setMetaTags({...props.metatags})
    setOG_Image("/img/OG_Image.png")
  },[props.metatags])

  const handleClick = () => {
    fileInputRef_OG_Image.current.click();
  };

  function handleChangeMeta(e) {
    const { id, name, value, checked } = e.target;
    setMetaTags(prev =>
      ({...prev, [name.replace('_checkbox', '')]: name.includes('checkbox') ? Number(checked) : value })
    );
  }
  async function saveMeta(){
    try{
        console.log(metaTags)
        const isValid = props.validateRequiredFields([metaTags], ['TITLE', 'DESCRIPTION', 'OG_URL', 'OG_SITENAME']);

        if (!isValid) {
            alert(`Не все поля заполнены!`)
            return;
        }
        await axios.post(`${server_config.api_protocol}://${server_config.site_folder}/back/updateMeta/${server_config.site_key}`, {
            metaTags: {...metaTags, OG_IMAGE: `${metaTags.OG_URL}/img/OG_Image.png`},
        },{
            withCredentials: true
        }).then((response) => {
            console.log(response)
            props.setMetatags(metaTags)
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

  const handleFileChange = async (e, name, path) => {
        const file = e.target.files[0];
        if (!file) return;
        console.log(e, name, path)

        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", name);
        
        try {
            const res = await axios.post(`${server_config.api_protocol}://${server_config.site_folder}/upload/replace/${server_config.site_key}?file_path=${path}`, formData);
            

            setOG_Image(`/img/OG_Image.png?v=${Date.now()}`)
        
        } catch (err) {
        console.error("Upload error:", err);
        }
    };
  return (
    <section>
        <h2 className='sectionTitle'>Метатеги</h2>
        <div className='sectionContent' id="metatags">
          <div className='cities-data'>
              <h3>Заголовки:</h3>
              <label><span className='label-title'>TITLE:</span>
              <input type='text' name='TITLE' placeholder='Тайтл' value={metaTags.TITLE || ''} onChange={handleChangeMeta} /></label>
              <label><span className='label-title'>DESCRIPTION:</span>
              <input type='text' name='DESCRIPTION' placeholder='Описание' value={metaTags.DESCRIPTION || ''} onChange={handleChangeMeta} /></label>
              <label><span className='label-title'>OG_IMAGE:</span>
              <div className='logo-editor-item'>
                <div className='imgContainer' onClick={handleClick}>
                    <img src={OG_Image} />
                </div>
                <input
                    type="file"
                    ref={fileInputRef_OG_Image}
                    style={{ display: "none" }}
                    accept=".png,image/png"
                    onChange={(e)=>handleFileChange(e, "OG_Image.png",`../${server_config.site_folder}/img`)}
                />
              </div>
              </label>
              <label><span className='label-title'>OG_URL:</span>
              <input type='text' name='OG_URL' placeholder='https://sitedomain.ru' value={metaTags.OG_URL || ''} onChange={handleChangeMeta} /></label>
              <label><span className='label-title'>OG_SITENAME:</span>
              <input type='text' name='OG_SITENAME' placeholder='Например "Уфанет"' value={metaTags.OG_SITENAME || ''} onChange={handleChangeMeta} /></label>
          </div>
          <div className='cities-buttons'>
            <button className='saveIcon-Button' onClick={saveMeta}></button>
          </div>
        </div>
    </section>
  );
}


export default Metatags;