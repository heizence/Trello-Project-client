import React from 'react'
import NavBar from './NavBar'
import CardModal from './CardModal'
import ListModal from './AddNewListModal'
import BoardTitleModal from './BoardTitleModal'

import InputComponent from './InputComponent'

function EachBoard({ match }) {
    const boardData = [
        {
            title: 'Things To Do',
            lists: [
                {contentTitle: '부족한 부분 파악하기', contentText: ''}, 
                {contentTitle: '복습', contentText: ''}
            ]
        },
        {
            title: 'Doing',
            lists: [
                {contentTitle: '블로깅하기', contentText: '블로깅 열심히 하자!'}, 
                {contentTitle: 'TIL 적기', contentText: '빼먹지 말자'}
            ]
        },
        {
            title: 'Done',
            lists: []
        }
    ]

    return (
        <div>
            <NavBar />
            <div className='PersonalBoards'>
                <div style={{marginBottom: '20px'}}>
                    <BoardTitleModal buttonLabel={match.params.boardName} css='changeBoardTitle'/>
                </div>                
                <ListModal buttonLabel='+ Add New List' css='AddNewList' />
                {boardData.map((data, index) => (
                    <div className='EachList' key={index}>
                        <div className='ListTitlesContainer'>
                            <InputComponent class="ListTitle" buttonLabel={data.title} type="title"/>
                            <div className="trashCan" onClick={() => ( alert('trashcan'))}></div>
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
                    //삭제 코드
                    alert('삭제되었습니다')
                }
            }}>Delete this Board</span>
        </div>
        
    )
}

export default EachBoard;


// 백업
// function EachBoard(props) {
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
//                 <h3 style={{marginLeft: '20px', marginBottom: '20px'}}>Personal Boards</h3>
//                 <ListModal buttonLabel='+ Add New List' css='AddNewList' />
//                 {boardData.map((data, index) => (
//                     <div className='EachList' key={index}>
//                         <div className='ListTitles'>
//                             <input className="ModalTitle" defaultValue={data.title}
//                             onClick={(e) => (e.target.select())}                
//                             style={{width: '160px', overflow: 'hidden'}} />
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
//         </div>
        
//     )
// }

// export default EachBoard;