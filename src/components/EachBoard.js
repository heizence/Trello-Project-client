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
        AddCard, ChangeCardTitle, DeleteCard,
        AddOrChangeCardDescription,
        boardTemp, listTemp, cardTemp,
        filterListData, filterCardData, assembleBoardData
    } = props

    const [deleted, setDeleted] = useState(false)
    
    const DeleteListOnClick = (listTitle) => {
        if (window.confirm('리스트를 삭제하시겠습니까? 리스트 내 모든 정보가 삭제됩니다.')) {
            DeleteList(board.boardTitle, listTitle)   
            alert('삭제되었습니다')
        }    
    }

    // const filterListData = (boardTitle, list, card) => {
    //     let listData = list.filter(list => {
    //         return list.boardTitle === boardTitle
    //     }).map(list => {
    //         return {
    //             title: list.listTitle,
    //             lists: filterCardData(boardTitle, list.listTitle, card).map(card => {
    //                 return { contentTitle: card.contentTitle, contentText: card.contentText }
    //             })
    //         }
    //     })

    //     return listData
    // }

    // const filterCardData = (boardTitle, listTitle, card) => {
    //     let cardData = card.filter(card => {
    //         return card.boardTitle === boardTitle && card.listTitle === listTitle
    //     })

    //     return cardData
    // }

    if (!props.logStatus) {
        return props.redirectPage('')
    }

    else {
        console.log('EachBoard에서 보드 데이터 확인 : ', assembleBoardData(boardTemp, listTemp, cardTemp))
        // console.log(board)
        // let board = assembleBoardData(boardTemp, listTemp, cardTemp)
        //console.log('보드 데이터 : ', boardTemp)
        //console.log('리스트 데이터 : ', listTemp)
        //console.log('카드 데이터 : ', cardTemp)
        //console.log('리스트 필터링 : ', filterListData(boardTemp.boardTitle, listTemp, cardTemp))
        //console.log('카드 필터링 : ', filterCardData(boardTemp.boardTitle, listTemp[0].listTitle, cardTemp))

        return (
            <div>
            {!deleted ? 
            <div>
                <NavBar />
                <div className='PersonalBoards'>
                    <div style={{marginBottom: '20px'}}>
                        <ChangeBoardTitleModal buttonLabel={board.boardTitle} css='changeBoardTitle'
                        setInfo={setInfo} ChangeBoardTitle={ChangeBoardTitle}/>
                    </div>                
                    <AddListModal buttonLabel='+ Add New List' css='AddNewList' 
                    boardTitle={board.boardTitle}
                    AddList={AddList} setInfo={setInfo}/>
                    {board.boardContents.map((data, index) => (
                        <div className='EachList' key={index}>
                            <div className='ListTitlesContainer'>
                                <InputComponent class="ListTitle" buttonLabel={data.title} type="title"
                                setInfo={setInfo} boardTitle={board.boardTitle} DirectChange={ChangeListTitle}/>
                                <div className="trashCan" onClick={() => {
                                    DeleteListOnClick(data.title)
                                }}></div>
                            </div>
                            <div>
                                {data.lists.map((content, index) => (
                                    <CardModal key={index} buttonLabel={content.contentTitle} 
                                    contentText={content.contentText} type='modify' css='CardContents'
                                    setInfo={setInfo} setInfo2={setInfo2} 
                                    boardTitle={board.boardTitle} listTitle={data.title}
                                    ChangeCardTitle={ChangeCardTitle} DeleteCard={DeleteCard}
                                    AddOrChangeCardDescription={AddOrChangeCardDescription}/>
                                ))}
                            </div>   
                            <CardModal buttonLabel='+ Add another card' type='add' css='AddCard'
                            AddCard={AddCard} setInfo={setInfo} setInfo2={setInfo2} boardTitle={board.boardTitle}
                            AddOrChangeCardDescription={AddOrChangeCardDescription}
                            listTitle={data.title}/>            
                        </div>
                    ))}
                </div>
                <span className='ModalDelete' 
                style={{position: 'absolute', right: '100px', bottom: '100px', fontSize: '25px'}}
                onClick={() => {
                    let answer = window.confirm('보드를 삭제하시겠습니까? 보드 내 모든 정보가 삭제됩니다.')
                    if (answer) {
                        setDeleted(true)
                        DeleteBoard(board.boardTitle)
                        alert('삭제되었습니다')
                    }
                }}>Delete this Board</span>
            </div>
            : <Redirect to='/main' />
            }
            </div>
            
        )
    }
}

export default EachBoard;

/*백업
const EachBoard = (props) => {    
    const { 
        board, setInfo, setInfo2, ChangeBoardTitle, DeleteBoard, 
        AddList, ChangeListTitle, DeleteList,
        AddCard, ChangeCardTitle, DeleteCard,
        AddOrChangeCardDescription,
        boardTemp, listTemp, cardTemp
    } = props

    const [deleted, setDeleted] = useState(false)
    
    const DeleteListOnClick = (listTitle) => {
        if (window.confirm('리스트를 삭제하시겠습니까? 리스트 내 모든 정보가 삭제됩니다.')) {
            DeleteList(board.boardTitle, listTitle)   
            alert('삭제되었습니다')
        }    
    }

    console.log('EachBoard에서 보드 데이터 확인 : ', boardTemp, '\n', listTemp, '\n', cardTemp)

    return (
        <div>
        {!deleted ? 
        <div>
            <NavBar />
            <div className='PersonalBoards'>
                <div style={{marginBottom: '20px'}}>
                    <ChangeBoardTitleModal buttonLabel={board.boardTitle} css='changeBoardTitle'
                    setInfo={setInfo} ChangeBoardTitle={ChangeBoardTitle}/>
                </div>                
                <AddListModal buttonLabel='+ Add New List' css='AddNewList' 
                boardTitle={board.boardTitle}
                AddList={AddList} setInfo={setInfo}/>
                {board.boardContents.map((data, index) => (
                    <div className='EachList' key={index}>
                        <div className='ListTitlesContainer'>
                            <InputComponent class="ListTitle" buttonLabel={data.title} type="title"
                            setInfo={setInfo} boardTitle={board.boardTitle} DirectChange={ChangeListTitle}/>
                            <div className="trashCan" onClick={() => {
                                DeleteListOnClick(data.title)
                            }}></div>
                        </div>
                        <div>
                            {data.lists.map((content, index) => (
                                <CardModal key={index} buttonLabel={content.contentTitle} 
                                contentText={content.contentText} type='modify' css='CardContents'
                                setInfo={setInfo} setInfo2={setInfo2} 
                                boardTitle={board.boardTitle} listTitle={data.title}
                                ChangeCardTitle={ChangeCardTitle} DeleteCard={DeleteCard}
                                AddOrChangeCardDescription={AddOrChangeCardDescription}/>
                            ))}
                        </div>   
                        <CardModal buttonLabel='+ Add another card' type='add' css='AddCard'
                        AddCard={AddCard} setInfo={setInfo} setInfo2={setInfo2} boardTitle={board.boardTitle}
                        AddOrChangeCardDescription={AddOrChangeCardDescription}
                        listTitle={data.title}/>            
                    </div>
                ))}
            </div>
            <span className='ModalDelete' 
            style={{position: 'absolute', right: '100px', bottom: '100px', fontSize: '25px'}}
            onClick={() => {
                let answer = window.confirm('보드를 삭제하시겠습니까? 보드 내 모든 정보가 삭제됩니다.')
                if (answer) {
                    setDeleted(true)
                    DeleteBoard(board.boardTitle)
                    alert('삭제되었습니다')
                }
            }}>Delete this Board</span>
        </div>
        : <Redirect to='/main' />
        }
        </div>
        
    )
}

export default EachBoard;
*/