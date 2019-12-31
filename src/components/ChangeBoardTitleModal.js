import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputComponent from './InputComponent'
// import { ChangeBoardTitle } from '../reduxFiles/Actions';
// import { connect } from 'react-redux';
//import { render } from '@testing-library/react';

// class ModalExample extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       modal: false,
//       oldTitle: this.props.buttonLabel,
//       newTitle: ''
//     }

//     this.toggle = this.toggle.bind(this)
//     this.ChangeBoard = this.ChangeBoard.bind(this)
//     this.setBoardTitle = this.setBoardTitle.bind(this)
//   }

//   toggle() {
//     this.setState({
//       modal: !this.state.modal
//     })
//   }

//   setBoardTitle(e) {
//     this.setState({
//       newTitle: e.target.value
//     })
//   }

//   ChangeBoard() {
//     this.props.ChangeBoard(this.state.oldTitle, this.state.newTitle)
//     console.log(this.props.board)
//   }

//   render() {
//     const { buttonLabel, className, css } = this.props;
//     return (
//       <div>
//       <span className={css} onClick={this.toggle}>{buttonLabel}</span>
//         <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={className}>
//           <ModalHeader toggle={this.toggle}>
//               <div className="ModalTitle" >보드 이름 변경</div>
//           </ModalHeader>
//           <ModalBody>          
//             <InputComponent class="ModalTitle" type="title" buttonLabel={buttonLabel}
//             setInfo={this.setBoardTitle} />
//           </ModalBody>
//           <ModalFooter>          
//             <Button color="primary" onClick={() => {
//               this.toggle()
//               this.ChangeBoard()
//             }}>변경</Button>
//             <Button color="secondary" onClick={this.toggle}>취소</Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   board : state.Change
// })

// const mapDispatchToProps = dispatch => ({
//   ChangeBoard : (oldTitle, newTitle) => dispatch(ChangeBoardTitle(oldTitle, newTitle))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);

const ModalExample = (props) => {
  
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const { buttonLabel, className, css } = props;

  return (
    <div>
    <span className={css} onClick={toggle}>{buttonLabel}</span>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
            <div className="ModalTitle" >보드 이름 변경</div>
        </ModalHeader>
        <ModalBody>          
          <InputComponent class="ModalTitle" type="title" buttonLabel={buttonLabel}
          setInfo={props.setInfo}/>
        </ModalBody>
        <ModalFooter>          
          <Button color="primary" onClick={() => {
            props.ChangeBoardTitle(buttonLabel)
            toggle()
          }}>변경</Button>
          <Button color="secondary" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
  
}

export default ModalExample;