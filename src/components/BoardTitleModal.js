import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputComponent from './InputComponent'

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    css
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
    <span className={css} onClick={toggle}>{buttonLabel}</span>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
            <div className="ModalTitle" >보드 이름 변경</div>
        </ModalHeader>
        <ModalBody>          
          <InputComponent class="ModalTitle" type="title" buttonLabel={buttonLabel} />
        </ModalBody>
        <ModalFooter>          
          <Button color="primary" onClick={toggle}>변경</Button>
          <Button color="secondary" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;