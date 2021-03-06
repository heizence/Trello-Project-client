import React, { useState } from 'react'

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
                props.DirectChange(props.boardId, props.listId)
            }
        }
        else if (e.keyCode === 27) {
            setClicked(!clicked)
        }
    }

    const createDivTag = () => {
        return (
            <div onClick={changeTag} className={props.class}>
            {props.class === 'ListTitle' ? props.buttonLabel :content}
            </div>
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
            defaultValue={props.buttonLabel}
            onClick={(e) => {
                e.target.select()
                //props.setInfo(e, e.target.defaultValue)
            }}
            onKeyUp={(e) => {pressEnter(e)}}
            onChange={(e) => {
                props.setInfo(null, e.target.value)
            }}
            className={classType}/> 
        )
    }

    const createTextareaTag = () => {
        return <textarea className='ModalContents' defaultValue={props.buttonLabel}
        onClick={(e) => {
            e.target.select()            
            //props.setInfo2(e)
        }} 
        onKeyUp={(e) => {pressEnter(e)}}
        onChange={(e) => {
            props.setInfo2(null, e.target.value || content)
        }}/>
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
