import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputComponent from './InputComponent'

const ModalExample = (props) => {  
  const {
    buttonLabel, className, type, css,
    boardTitle, listTitle, contentText,
    boardId, listId, cardId,
    setInfo, setInfo2,
    AddCard, ChangeCard, DeleteCard,
    AddOrChangeCardDescription
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className={css} onClick={toggle}>{buttonLabel}</div>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
            <InputComponent class="ModalTitle" type='title'
            buttonLabel={buttonLabel === '+ Add another card' ? '제목을 입력하세요' : buttonLabel}
            setInfo={setInfo} />
        </ModalHeader>
        <ModalBody>
          <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>Description</div>
          <InputComponent class="ModalContents" buttonLabel={contentText || '내용을 입력하세요'} type='textarea'
          setInfo={setInfo} setInfo2={setInfo2}
          boardTitle={boardTitle} listTitle={listTitle} cardTitle={buttonLabel}
          AddOrChangeCardDescription={AddOrChangeCardDescription}/>
          {type === 'modify' ? <div className='ModalDelete' 
          onClick={() => {
            let answer = window.confirm('카드를 삭제하시겠습니까?')
                if (answer) {
                    DeleteCard(boardId, listId, cardId)
                    toggle()
                }
          }}>Delete this Card</div> : ''}
        </ModalBody>
        <ModalFooter>
          {type === 'modify' ? <Button color="primary" onClick={() => {
            ChangeCard(boardId, listId, cardId) 
            toggle()
          }}>수정</Button> :
          <Button color="primary" onClick={() => {
            AddCard(boardId, listId)
            toggle()
          }}>추가</Button>}

          <Button color="secondary" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;
