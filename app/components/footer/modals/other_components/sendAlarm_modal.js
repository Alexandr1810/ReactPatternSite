'use client'

function SendAlarmModal(props){
    return(
        <div className='modal' id="sendAlarm-modal">
            <div className='modal-background modal-fade' onClick={()=>props.closeModal('sendAlarm-modal')} ></div>
            <div className='modal-content modal-fade'>
                <div className='modal-header'>
                    <div id='modal-header-alarm'></div>
                    <span className='modal-header-title'>Заявка уже отправлена</span>
                </div>
                <div className='modal-body'>
                    <span className='modal-body-text'>Наша команда уже получила ваше обращение и свяжется с вами в ближайшее время. Если у вас появились вопросы или дополнения, вы сможете сообщить об этом менеджеру.</span>
                    <hr />
                    <span className='modal-body-telegramText' dangerouslySetInnerHTML={{__html: props.telegramText}}></span>
                </div>
            </div>
        </div>
    )
}
export default SendAlarmModal;