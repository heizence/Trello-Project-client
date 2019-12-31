import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import CreateNewBoard from './AddNewBoardModal'

// function Main(props) {
//     return (
//         <div>
//             <NavBar />
//             <div className='PersonalBoards'>
//                 <h3 style={{marginLeft: '20px', marginBottom: '20px', fontWeight: 'bold'}}>Personal Boards</h3>
//                 {props.board.map((board, index) => (
//                     <Link to={`/main/${board}`} key={index}>
//                     <div className='EachBoard' key={index}>{board}</div>
//                     </Link>
//                 ))}
//                 <CreateNewBoard buttonLabel='Create new board' css='CreateBoard' />
//             </div>
//         </div>
//     )
// }

// export default Main;

function Main(props) {
    //console.log('보드 제목 : ', props.board)
    return (
        <div>
            <NavBar />
            <div className='PersonalBoards'>
                <h3 style={{marginLeft: '20px', marginBottom: '20px', fontWeight: 'bold'}}>Personal Boards</h3>
                {props.board.map((board, index) => (
                    <Link to={`/main/${index}`} key={index}>
                        <div className='EachBoard' key={index}>{board}</div>
                    </Link>
                ))}
                <CreateNewBoard buttonLabel='Create new board' css='CreateBoard' 
                AddBoard={props.AddBoard} setInfo={props.setInfo}/>
            </div>
        </div>
    )
}

export default Main;

// <div id='CreateBoard' onClick={() => {
//     let boardTitle = prompt('보드 이름을 입력하세요')
//     console.log('추가한 보드 이름 : ', boardTitle)
//     if (boardTitle) {
//         props.AddBoard(boardTitle)
//     }
// }}>TEST</div>