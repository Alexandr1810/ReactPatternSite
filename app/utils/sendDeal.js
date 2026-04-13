import axios from 'axios';
import { server_config } from './server_config.js'
import { openModal } from './functions.js';

export async function sendForm(formData){
    formData.title = `Заявка с сайта ${window.location.host}`;
    console.log('Форма', formData);

    return await axios.post(server_config.api_host+`/front/sendDeal/${server_config.site_key}`, formData).then((response) => {
        console.log('Ответ сервера:', response.data);
        if(response.data.success){
            openModal('sendDone-modal');
            return true;
        }else if(response.data.error && response.data.error === 'thirtyMinutesError'){
            openModal('sendAlarm-modal');
            return false;
        }else{
            openModal('sendError-modal');
            return false;
        }
    })
    .catch((error) => {
        console.error('Ошибка при отправке формы:', error);

        if(error.response.data.error && error.response.data.error === 'thirtyMinutesError'){
            openModal('sendAlarm-modal');
        }else{
            openModal('sendError-modal');
        }
        
        return false;
    });
}