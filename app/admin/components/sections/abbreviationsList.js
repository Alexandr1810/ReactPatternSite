import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import {server_config} from '@/app/utils/server_config'

function AbbreviationsList(props) {
  const [site_config, setSite_config] = useState({})

  useEffect(()=>{
    setSite_config({...props.site_config})
  },[props.site_config])


  return (
    <section>
        <h2 className='sectionTitle'>Список Сокращений</h2>
        <div className='sectionContent' id="abbreviationsList">
          <div className='cities-data'>
              <h3>Билиотека:</h3>

              <div className='cities-data-item f-column'>
                <span><b>Название провайдера:</b></span>
                <label className='textarea-label f-row'>
                  <input type='text' value="{provider_name}" disabled className='disabled-show' />
                  <h4 className='jc-content'>{"->"}</h4>
                  <input type='text' value={site_config.provider_name || ''} disabled className='disabled-show' />
                </label>
              </div>

              <div className='cities-data-item f-column'>
                <span><b>Название провайдера (Родительный падеж):</b></span>
                <label className='textarea-label f-row'>
                  <input type='text' value="{genitive_provider_name}" disabled className='disabled-show' />
                  <h4 className='jc-content'>{"->"}</h4>
                  <input type='text' value={site_config.genitive_provider_name || ''} disabled className='disabled-show' />
                </label>
              </div>
              

              <div className='cities-data-item f-column'>
                <span><b>Юридическое название провайдера:</b></span>
                <label className='textarea-label f-row'>
                  <input type='text' value="{company_name}" disabled className='disabled-show' />
                  <h4 className='jc-content'>{"->"}</h4>
                  <input type='text' value={site_config.company_name || ''} disabled className='disabled-show' />
                </label>
              </div>

              <div className='cities-data-item f-column'>
                <span><b>Телефон (поддержка):</b></span>
                <label className='textarea-label f-row'>
                  <input type='text' value="{support_phone}" disabled className='disabled-show' />
                  <h4 className='jc-content'>{"->"}</h4>
                  <input type='text' value={site_config.support_phone || ''} disabled className='disabled-show' />
                </label>
              </div>

              <div className='cities-data-item f-column'>
                <span><b>Телефон (подключение):</b></span>
                <label className='textarea-label f-row'>
                  <input type='text' value="{connection_phone}" disabled className='disabled-show' />
                  <h4 className='jc-content'>{"->"}</h4>
                  <input type='text' value={site_config.connection_phone || ''} disabled className='disabled-show' />
                </label>
              </div>

              <div className='cities-data-item f-column'>
                <span><b>Домен сайта:</b></span>
                <label className='textarea-label f-row'>
                  <input type='text' value="{site_domain}" disabled className='disabled-show' />
                  <h4 className='jc-content'>{"->"}</h4>
                  <input type='text' value={server_config.site_folder || ''} disabled className='disabled-show' />
                </label>
              </div>

              <div className='cities-data-item f-column'>
                <span><b>Владелец сайта:</b></span>
                <label className='textarea-label f-row'>
                  <input type='text' value="{siteOwner_name}" disabled className='disabled-show' />
                  <h4 className='jc-content'>{"->"}</h4>
                  <input type='text' value={site_config.siteOwner_name || ''} disabled className='disabled-show' />
                </label>
              </div>

              <div className='cities-data-item f-column'>
                <span><b>Ссылка на телеграм канал с иконкой:</b></span>
                <label className='f-row'>
                  <input type='text' value="{domatelecom_link}" disabled className='disabled-show' />
                  <h4 className='jc-content'>{"->"}</h4>
                  <input type='text' value={`<a target="_blank" href="${site_config.telegram_link}">ДомаТелеком</a>`} disabled className='disabled-show' />
                </label>
              </div>
          </div>
        </div>
    </section>
  );
}


export default AbbreviationsList;