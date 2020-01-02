import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputComponent from './InputComponent';

const ModalExample = (props) => {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const { buttonLabel, className, css, AddBoard, setInfo } = props;

  return (
    <div style={{display: 'inline-block'}}>
      <div id={css} onClick={toggle}>{buttonLabel}</div>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
            <div className="ModalTitle" >새로운 보드 추가</div>
        </ModalHeader>
        <ModalBody>          
          <InputComponent class="ModalTitle" type="title" buttonLabel="보드 이름을 입력하세요"
          setInfo={setInfo} />          
        </ModalBody>
        <ModalFooter>          
          <Button color="primary" onClick={() => {
            toggle()
            AddBoard()
          }}>추가</Button>
          <Button color="secondary" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </div>
  );  
}

export default ModalExample;