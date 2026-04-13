'use client'

function SendDoneModal(props){
    return(
        <div className='modal' id="sendDone-modal">
            <div className='modal-background modal-fade' onClick={()=>props.closeModal('sendDone-modal')} ></div>
            <div className='modal-content modal-fade'>
                <div className='modal-header'>
                    <div id='modal-header-done'></div>
                    <span className='modal-header-title'>Спасибо за заявку!</span>
                </div>
                <div className='modal-body'>
                    <span className='modal-body-text'>В ближайшее время с вами свяжется наш менеджер для уточнения деталей и поможет с подключением.</span>
                    <hr />
                    <span className='modal-body-telegramText' dangerouslySetInnerHTML={{__html: props.telegramText}}></span>
                </div>
            </div>
        </div>
    )
}
export default SendDoneModal;