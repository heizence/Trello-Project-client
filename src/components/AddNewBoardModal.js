import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputComponent from './InputComponent';
import { connect } from 'react-redux';
import { AddNewBoard } from '../reduxFiles/Actions';
import { render } from '@testing-library/react';

// class ModalExample extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       modal: false,
//       boardTitle: ''
//     }

//     this.toggle = this.toggle.bind(this)
//     this.AddBoard = this.AddBoard.bind(this)
//     this.setBoardTitle = this.setBoardTitle.bind(this)
//   }

//   toggle() {
//     this.setState({
//       modal: !this.state.modal
//     })
//   }

//   setBoardTitle(e) {
//     this.setState({
//       boardTitle: e.target.value
//     })
//   }

//   AddBoard() {
//     this.props.AddBoard(this.state.boardTitle)
//   }

//   render() {
//     const { buttonLabel, className, css } = this.props;
//     return (
//       <div style={{display: 'inline-block'}}>
//         <div id={css} onClick={this.toggle}>{buttonLabel}</div>
//         <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={className}>
//           <ModalHeader toggle={this.toggle}>
//               <div className="ModalTitle" >새로운 보드 추가</div>
//           </ModalHeader>
//           <ModalBody>          
//             <InputComponent class="ModalTitle" type="title" buttonLabel="보드 이름을 입력하세요"
//             setInfo={this.setBoardTitle} />          
//           </ModalBody>
//           <ModalFooter>          
//             <Button color="primary" onClick={() => {
//               this.toggle()
//               this.AddBoard()
//             }}>추가</Button>
//             <Button color="secondary" onClick={this.toggle}>취소</Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
  
// }

// const mapStateToProps = state => ({
//   board : state.Add
// })

// const mapDispatchToProps = dispatch => ({
//   AddBoard : boardTitle => dispatch(AddNewBoard(boardTitle))
// })

// export default connect(
//   mapStateToProps, mapDispatchToProps
// )(ModalExample);

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