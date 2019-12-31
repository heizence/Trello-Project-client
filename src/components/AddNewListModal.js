import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputComponent from './InputComponent'

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    css,
    boardTitle,
    setInfo,
    AddList
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <span className={css} onClick={toggle}>{buttonLabel}</span>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
            <div className="ModalTitle" >새로운 리스트 추가</div>
        </ModalHeader>
        <ModalBody>          
          <InputComponent class="ModalTitle" type="title" buttonLabel="리스트의 타이틀을 입력하세요"
          setInfo={setInfo}/>
        </ModalBody>
        <ModalFooter>          
          <Button color="primary" onClick={() => {
            AddList(boardTitle)
            toggle()
          }}>추가</Button>
          <Button color="secondary" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;