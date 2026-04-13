'use client'

function SendErrorModal(props){

    
    return(
        <div className='modal' id="sendError-modal">
            <div className='modal-background modal-fade' onClick={()=>props.closeModal('sendError-modal')} ></div>
            <div className='modal-content modal-fade'>
                <div className='modal-header'>
                    <div id='modal-header-error'></div>
                    <span className='modal-header-title'>Ошибка!</span>
                </div>
                <div className='modal-body'>
                    <span className='modal-body-text'>К сожалению мы не смогли передать ваше обращение, пожалуйста попробуйте еще раз или повторите позже.</span>
                </div>
            </div>
        </div>
    )
}
export default SendErrorModal;