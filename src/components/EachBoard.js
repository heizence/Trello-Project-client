import React, { useState } from 'react'
import NavBar from './NavBar'
import CardModal from './CardModal'
import AddListModal from './AddNewListModal'
import ChangeBoardTitleModal from './ChangeBoardTitleModal'

import InputComponent from './InputComponent'
import { Redirect } from 'react-router-dom'

// function EachBoard({ match }) {
//     const boardData = [
//         {
//             title: 'Things To Do',
//             lists: [
//                 {contentTitle: '부족한 부분 파악하기', contentText: ''}, 
//                 {contentTitle: '복습', contentText: ''}
//             ]
//         },
//         {
//             title: 'Doing',
//             lists: [
//                 {contentTitle: '블로깅하기', contentText: '블로깅 열심히 하자!'}, 
//                 {contentTitle: 'TIL 적기', contentText: '빼먹지 말자'}
//             ]
//         },
//         {
//             title: 'Done',
//             lists: []
//         }
//     ]

//     return (
//         <div>
//             <NavBar />
//             <div className='PersonalBoards'>
//                 <div style={{marginBottom: '20px'}}>
//                     <BoardTitleModal buttonLabel={match.params.boardName} css='changeBoardTitle'/>
//                 </div>                
//                 <ListModal buttonLabel='+ Add New List' css='AddNewList' />
//                 {boardData.map((data, index) => (
//                     <div className='EachList' key={index}>
//                         <div className='ListTitlesContainer'>
//                             <InputComponent class="ListTitle" buttonLabel={data.title} type="title"/>
//                             <div className="trashCan" onClick={() => ( alert('trashcan'))}></div>
//                         </div>
//                         <div>
//                             {data.lists.map((content, index) => (
//                                 <CardModal key={index} buttonLabel={content.contentTitle} 
//                                 contentText={content.contentText} type='modify' css='CardContents'/>
//                             ))}
//                         </div>   
//                         <CardModal buttonLabel='+ Add another card' type='add' css='AddCard'/>            
//                     </div>
//                 ))}
//             </div>
//             <span className='ModalDelete' 
//             style={{position: 'absolute', right: '100px', bottom: '100px', fontSize: '25px'}}
//             onClick={() => {
//                 let answer = window.confirm('보드를 삭제하시겠습니까? 보드 내 모든 정보가 삭제됩니다.')
//                 if (answer) {
//                     //삭제 코드
//                     alert('삭제되었습니다')
//                 }
//             }}>Delete this Board</span>
//         </div>
        
//     )
// }

// export default EachBoard;

function EachBoard(props) {    
    const { 
        board, setInfo, ChangeBoardTitle, DeleteBoard, AddList, ChangeListTitle,
        DeleteList } = props

    const [deleted, setDeleted] = useState(false)
    
    console.log('보드 정보 : ', board)
    
    const DeleteListOnClick = (listTitle) => {
        alert('리스트를 삭제하시겠습니까? 리스트 내 모든 정보가 삭제됩니다.')
        DeleteList(board.boardTitle, listTitle)        
    }
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
                                contentText={content.contentText} type='modify' css='CardContents'/>
                            ))}
                        </div>   
                        <CardModal buttonLabel='+ Add another card' type='add' css='AddCard'/>            
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