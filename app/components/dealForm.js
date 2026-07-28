'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { IMaskInput } from 'react-imask';
import { useUtm  } from '@/app/components/hooks/useUtm.js';
import { sendForm } from '@/app/utils/sendDeal.js';
import { getCookie } from '@/app/utils/cookies.js';

import { server_config } from '@/app/utils/server_config.js'

function Form ({
        reachGoal,
        reachGoals,
        formId,
        formName,
        activeCity,
        offer
    }){
    const { utm_source, utm_medium, utm_campaign, utm_content, utm_term } = useUtm();
    const [NullFields, setNullFields] = useState({}); // объект ошибок по обязательным полям
    const [ErrorFields, setErrorFields] = useState({}); // объект ошибок по обязательным полям
    const [isSending, setIsSending] = useState(false);

    // --- Получаем куки ---

    //Yclid
    const ysclid = getCookie('ym_client_id');         //UF_CRM_1714623527891 // Раньше получал из _ym_uid
    
    //ClientID
    const yclid = getCookie('ym_client_id');               //UF_CRM_1721476616007
    
    //Counter
    const counter = getCookie('y_counter_id');        //UF_CRM_1716276864105
    
    const [form, setForm] = useState({
        name: '',
        tel: '',
        addres: '',
        city: activeCity || '',
        politicCheckbox: false
    });

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            utm_source: utm_source,
            utm_medium: utm_medium,
            utm_campaign: utm_campaign,
            utm_content: utm_content,
            utm_term: utm_term,
            ysclid: ysclid,
            yclid: yclid,
            counter: counter,
            city: activeCity,
            formName: formName || 'Форма не определена',
            offer: offer ? `Название: ${offer.name} \n Ссылка: http://${window.location.host}/offer/${offer.id} \n Нужен роутер: ${offer.needRouter ? 'Да' : 'Нет'} \n Нужна приставка  ${offer.needPristavka ? 'Да' : 'Нет'}` : 'Не выбран',
        }));
    }, [utm_source, utm_medium, utm_campaign, utm_content, utm_term, activeCity, formName, offer]);

    function normalizePhone(phone) {
        return phone.replace(/\D/g, '');
    }
    function isValidPhone(phone) {
        return phone.length === 11 && phone.startsWith('7');
    }
    
    function handleChange(e) {
        const { name, value, checked } = e.target;
        console.log(e.target);
        setForm(prev => ({
            ...prev,
            [name]: name === 'politicCheckbox' ? checked : value
        }));
        
        // снимаем ошибку ТОЛЬКО у этого поля
        if (NullFields[name]) {
            setNullFields(prev => {
            const copy = { ...prev };
            delete copy[name];
            return copy;
            });
        }
    }

    async function handleCaptchaSuccess(token) {  
        try {
            //закрываем кнопку отправки
            setIsSending(true);

            const newNullFields = {};
            const newErrors = {};
            form.tel = normalizePhone(form.tel);
            
            // Проверка обязательных полей
            Object.entries(form).forEach(([key, value]) => {
                if ((key === 'name' || key === 'tel' || key === 'addres') && !value.trim()) {
                    newNullFields[key] = true;
                }else if (key === 'tel' && !isValidPhone(value)) {
                    newErrors[key] = true;
                }else if (key === 'politicCheckbox' && !value) {
                    newNullFields[key] = true;
                }
            });
            // Если есть незаполненные поля - не отправляем форму
            if (Object.keys(newNullFields).length > 0 || Object.keys(newErrors).length > 0) {
                setNullFields(newNullFields);
                setErrorFields(newErrors);
                setIsSending(false);
                return;
            }

            // Отправляем форму
            const send_res = await sendForm({
                ...form, 
                token: token
            });

            // Сбрасываем форму
            setForm({
                ...form,
                name: '',
                tel: '',
                addres: ''
            });

            //Открываем кнопку отправки
            setIsSending(false);
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            //Открываем кнопку отправки
            setIsSending(false);
        }
        finally{
            setIsSending(false);
        }
    }

    async function handleSubmit(e) { // если возвращаем капчу - поставить эту штуку вместо handleCaptchaSuccess в форме
        try {
            setIsSending(true);
            const token = await executeCaptcha();
            await handleCaptchaSuccess(token);
        } catch (error) {
            console.error("Captcha error:", error);
        }
        finally{
            setIsSending(false);
        }
    }; 


    return(
        <div id={`dealForm-${formId}`} className='dealForm'>
        <form className='dealForm' onSubmit={(e)=>{
                e.preventDefault(); // не перезагружать страницу
                console.log(1)
                if (window.ym) {
                    console.log(2)
                    console.log(reachGoals.ym_counter)
                    console.log(reachGoals[reachGoal] || reachGoal)
                    window.ym(reachGoals.ym_counter, 'reachGoal', reachGoals[reachGoal] || reachGoal); 
                }
                handleCaptchaSuccess();
            }}>
            <label htmlFor='name' className={`form-field ${NullFields.name ? 'NullFields' : ''} ${ErrorFields.name ? 'ErrorFields' : ''}`}>Ваше имя:</label>
            <input type="text" value={form.name} name="name" placeholder='Введите имя' onChange={handleChange} />
            <label htmlFor='tel' className={`form-field ${NullFields.tel ? 'NullFields' : ''} ${ErrorFields.tel ? 'ErrorFields' : ''}`}>Телефон:</label>
            <IMaskInput
                type="tel"
                value={form.tel}
                name="tel"
                mask="+{7} (000) 000-00-00"
                placeholder="+7 (___) ___-__-__"
                onAccept={(value) => handleChange({
                    target: { name: 'tel', value }
                })}
            />
            <label htmlFor='addres' className={`form-field ${NullFields.addres ? 'NullFields' : ''} ${ErrorFields.addres ? 'ErrorFields' : ''}`}>Адрес подключения:</label>
            <input type="text" value={form.addres} name="addres" placeholder='Введите адрес' onChange={handleChange} />
            <label className='politicBlock'>
                <input type='checkbox' className={`politicCheckbox ${NullFields.politicCheckbox ? 'NullFields' : ''}`} name='politicCheckbox' onChange={handleChange} />
                <span className='politicText'>Я подтверждаю ознакомление с <a href={`${server_config.api_protocol}://${server_config.site_folder}/uploads/${server_config.site_key}/politics/politika.pdf`} target="_blank" >Политикой обработки персональных данных</a> и даю <a href={`${server_config.api_protocol}://${server_config.site_folder}/uploads/${server_config.site_key}/politics/sogl.pdf`} target="_blank" >Согласие на обработку моих персональных данных.</a></span>
            </label>
            <button type='submit' className={`dealForm-button ${isSending ? 'sending' : ''}`} disabled={isSending}
            ><span>Cтать абонентом</span></button>
        </form>      
        </div>
    )
}
export default Form;
