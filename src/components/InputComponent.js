import React, { Component, useState } from 'react'

// class InputComponent extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             isClicked: false,
//             contents: this.props.buttonLabel
//         }
//         this.changeTag = this.changeTag.bind(this)
//         this.pressEnter = this.pressEnter.bind(this)
//         this.createInputTag = this.createInputTag.bind(this)
//         this.createTextareaTag = this.createTextareaTag.bind(this)
//     }

//     changeTag() {
//         this.setState({
//             isClicked: !this.state.isClicked
//         })
//     }

//     pressEnter(e) {
//         if (e.keyCode === 13 && !e.shiftKey) {
//             this.setState({
//                 contents: e.target.value,
//                 isClicked: !this.state.isClicked
//             })
//         }
//         else if (e.keyCode === 27) {
//             this.setState({
//                 isClicked: !this.state.isClicked
//             })
//         }
//     }

//     createDivTag() {
//         return (
//             <div onClick={this.changeTag} className={this.props.class}>{this.state.contents}</div>
//         )
//     }
    
//     createInputTag() {
//         let classType = ''
//         if (this.props.class === 'ListTitle') {
//             classType = 'ListInput'
//         }
//         else {
//             classType = 'ModalInput'
//         }

//         return (
//             <input 
//             defaultValue={this.state.contents} 
//             onClick={(e) => (e.target.select())}
//             onKeyUp={(e) => {this.pressEnter(e)}}
//             onChange={this.props.setInfo}
//             className={classType}/> 
//         )
//     }

//     createTextareaTag() {
//         return <textarea className='ModalContents' defaultValue={this.state.contents}
//         onClick={(e) => (e.target.select())} 
//         onKeyUp={(e) => {this.pressEnter(e)}}
//         onChange={this.props.setInfo}/>
//     }

//     render() {
//         let tagToCreate

//         if (this.props.type === 'title') {
//             tagToCreate = this.createInputTag
//         }
//         else if (this.props.type === 'textarea') {
//             tagToCreate = this.createTextareaTag
//         }

//         if (this.state.isClicked) {
//             return tagToCreate()
//         }
//         else {
//             return this.createDivTag()
//         }        
//     }
// }

// export default InputComponent;

const InputComponent = (props) => {
    const [clicked, setClicked] = useState(false)
    const [content, setContent] = useState(props.buttonLabel)

    const changeTag = () => {
        setClicked(!clicked)
    }

    const pressEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {            
            setClicked(!clicked)
            setContent(e.target.value)
            
            if (props.DirectChange) {
                props.DirectChange(props.boardTitle, props.buttonLabel)
            }
        }
        else if (e.keyCode === 27) {
            setClicked(!clicked)
        }
    }

    const createDivTag = () => {
        return (
            <div onClick={changeTag} className={props.class}>{content}</div>
        )
    }
    
    const createInputTag = () => {
        let classType = ''
        if (props.class === 'ListTitle') {
            classType = 'ListInput'
        }
        else {
            classType = 'ModalInput'
        }

        return (
            <input 
            defaultValue={content} 
            onClick={(e) => (e.target.select())}
            onKeyUp={(e) => {pressEnter(e)}}
            onChange={props.setInfo}
            className={classType}/> 
        )
    }

    const createTextareaTag = () => {
        return <textarea className='ModalContents' defaultValue={content}
        onClick={(e) => (e.target.select())} 
        onKeyUp={(e) => {pressEnter(e)}}
        onChange={(e) => props.setInfo(e)}/>
    }

    let tagToCreate

    if (props.type === 'title') {
        tagToCreate = createInputTag
    }
    else if (props.type === 'textarea') {
        tagToCreate = createTextareaTag
    }

    if (clicked) {
        return tagToCreate()
    }
    else {
        return createDivTag()
    }
}

export default InputComponent;