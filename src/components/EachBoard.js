import React, { useState } from 'react'
import NavBar from './NavBar'
import CardModal from './CardModal'
import AddListModal from './AddNewListModal'
import ChangeBoardTitleModal from './ChangeBoardTitleModal'
import InputComponent from './InputComponent'
import { Redirect } from 'react-router-dom'

const EachBoard = (props) => {    
    const { 
        board, setInfo, setInfo2, ChangeBoardTitle, DeleteBoard, 
        AddList, ChangeListTitle, DeleteList,
        AddCard, ChangeCard, DeleteCard
    } = props

    const [deleted, setDeleted] = useState(false)
    
    const DeleteListOnClick = (listId) => {
        if (window.confirm('리스트를 삭제하시겠습니까? 리스트 내 모든 정보가 삭제됩니다.')) {
            DeleteList(board._id, listId)   
        }    
    }

    if (!props.logStatus) {
        return props.redirectPage('')
    }

    else {
        return (
            <div>
            {!deleted ? 
            <div>
                <NavBar logOut={props.fetchLogOut}/>
                <div className='PersonalBoards'>
                    <div style={{marginBottom: '20px'}}>
                        <ChangeBoardTitleModal boardId={board._id}
                        buttonLabel={board.boardTitle} css='changeBoardTitle'
                        setInfo={setInfo} ChangeBoardTitle={ChangeBoardTitle}/>
                    </div>                
                    <AddListModal buttonLabel='+ Add New List' css='AddNewList' 
                    boardId={board._id} AddList={AddList} setInfo={setInfo}/>
                    <div>
                    {board.lists.map((list, index) => (                        
                        <div className='EachList' key={index}>
                            <div className='ListTitlesContainer'>
                                <InputComponent class="ListTitle" buttonLabel={list.listTitle} type="title"
                                setInfo={setInfo} boardId={board._id} listId={list._id}
                                listInfo={list}
                                DirectChange={ChangeListTitle}/>
                                <div className="trashCan" onClick={() => {
                                    DeleteListOnClick(list._id)
                                }}></div>
                            </div>
                            <div>
                                {list.cards.map((card, index) => (
                                    <CardModal key={index} buttonLabel={card.cardTitle} 
                                    contentText={card.contentText} type='modify' css='CardContents'
                                    setInfo={setInfo} setInfo2={setInfo2} 
                                    boardId={board._id} listId={list._id} cardId={card._id}
                                    ChangeCard={ChangeCard} DeleteCard={DeleteCard}/>
                                ))}
                            </div>   
                            <CardModal buttonLabel='+ Add another card' type='add' css='AddCard'
                            boardId={board._id} listId={list._id}
                            AddCard={AddCard} setInfo={setInfo} setInfo2={setInfo2} boardTitle={board.boardTitle}
                            listTitle={list.title}/>            
                        </div>
                    ))}
                </div>
                <span className='ModalDelete' 
                style={{position: 'absolute', right: '100px', bottom: '100px', fontSize: '25px'}}
                onClick={() => {
                    let answer = window.confirm('보드를 삭제하시겠습니까? 보드 내 모든 정보가 삭제됩니다.')
                    if (answer) {
                        setDeleted(true)
                        DeleteBoard(board._id)
                    }
                }}>Delete this Board</span>
                </div>
            </div>
            : <Redirect to='/main' />
            }
            </div>
            
        )
    }
}

export default EachBoard;
