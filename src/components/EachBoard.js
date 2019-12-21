import React from 'react'
import NavBar from './NavBar'
import ModalButton from './Modals'

function EachBoard(props) {
    const boardData = [
        {
            title: 'Things To Do',
            contents: ['부족한 부분 파악하기', '복습']
        },
        {
            title: 'Doing',
            contents: ['계획 세우기', '공부할 부분 정하기', '긴 글 테스트 11111111111111111111111111111111111111']
        },
        {
            title: 'Done',
            contents: []
        }
    ]
    return (
        <div>
            <NavBar />
            <div className='PersonalBoards'>
                <h3 style={{marginLeft: '20px', marginBottom: '20px'}}>Personal Boards</h3>
                {boardData.map((data, index) => (
                    <div className='EachList' key={index}>
                        <div className='ListTitles'>{data.title}</div>
                        <div>
                            {data.contents.map((content, index) => (
                                <ModalButton key={index} buttonLabel={content}/>
                            ))}
                        </div>  
                        <div className='AddCard'>+ Add another card</div>                  
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default EachBoard;


// 백업
// return (
//     <div>
//         <NavBar />
//         <div className='PersonalBoards'>
//             <h3 style={{marginLeft: '20px', marginBottom: '20px'}}>Personal Boards</h3>
//             {boardData.map((data, index) => (
//                 <div className='EachList' key={index}>
//                     <div className='ListTitles'>{data.title}</div>
//                     <div>
//                         {data.contents.map((content, index) => (
//                             <div className='CardContents' key={index}>{content}</div>
//                         ))}
//                     </div>  
//                     <div className='AddCard'>+ Add another card</div>                  
//                 </div>
//             ))}
//         </div>
//         <ModalButton buttonLabel='부족한 부분 파악하기'/>
//     </div>
// )