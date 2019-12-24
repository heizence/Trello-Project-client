import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputComponent from './InputComponent'

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    type,
    css
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className={css} onClick={toggle}>{buttonLabel}</div>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
            <InputComponent class="ModalTitle" type='title'
            buttonLabel={buttonLabel === '+ Add another card' ? '제목을 입력하세요' : buttonLabel} />
        </ModalHeader>
        <ModalBody>
          <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>Description</div>
          <InputComponent class="ModalContents" buttonLabel={props.contentText || '내용을 입력하세요'} type='textarea'/>
          {type === 'modify' ? <div className='ModalDelete' 
          onClick={() => {
            let answer = window.confirm('카드를 삭제하시겠습니까?')
                if (answer) {
                    //삭제 코드
                    alert('삭제되었습니다')
                }
          }}>Delete this Card</div> : ''}
        </ModalBody>
        <ModalFooter>
          {type === 'modify' ? <Button color="primary" onClick={toggle}>수정</Button> :
          <Button color="primary" onClick={toggle}>추가</Button>}

          <Button color="secondary" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;

// 백업

// const ModalExample = (props) => {
//   const {
//     buttonLabel,
//     className,
//     type,
//     css
//   } = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <div>
//       <div className={css} onClick={toggle}>{buttonLabel}</div>
//       <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
//         <ModalHeader toggle={toggle}>
//             <input className="ModalTitle" 
//             defaultValue={buttonLabel === '+ Add another card' ? '제목을 입력하세요' : buttonLabel}
//             onClick={(e) => (e.target.select())} />
//         </ModalHeader>
//         <ModalBody>
//           <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>Description</div>
//           <textarea className='ModalContents' defaultValue={props.contentText || '내용을 입력하세요'}
//           onClick={(e) => (e.target.select())} />
//           {type === 'modify' ? <div className='ModalDelete' onClick={() => alert('delete')}>Delete this Card</div> : ''}
//         </ModalBody>
//         <ModalFooter>
//           {type === 'modify' ? <Button color="primary" onClick={toggle}>수정</Button> :
//           <Button color="primary" onClick={toggle}>추가</Button>}

//           <Button color="secondary" onClick={toggle}>취소</Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default ModalExample;