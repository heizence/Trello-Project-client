import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import CreateNewBoard from './AddNewBoardModal'

function Main(props) {
    //const boardList = ['b1', 'b2', 'b3', 'b4', 'b5']
    return (
        <div>
            <NavBar />
            <div className='PersonalBoards'>
                <h3 style={{marginLeft: '20px', marginBottom: '20px', fontWeight: 'bold'}}>Personal Boards</h3>
                {props.boardData.map((board, index) => (
                    <Link to={`/main/${board}`} key={index}>
                    <div className='EachBoard' key={index}>{board}</div>
                    </Link>
                ))}
                <CreateNewBoard buttonLabel='Create new board' css='CreateBoard' />
            </div>
        </div>
    )
}

export default Main;

// 백업
// function Main(props) {
//     const boardList = ['b1', 'b2', 'b3', 'b4', 'b5']
//     return (
//         <div>
//             <NavBar />
//             <div className='PersonalBoards'>
//                 <h3 style={{marginLeft: '20px', marginBottom: '20px'}}>Personal Boards</h3>
//                 {boardList.map((board, index) => (
//                     <div className='EachBoard' index={index}>{board}</div>
//                 ))}
//                 <div id='CreateBoard'>Create new board</div>
//             </div>
//         </div>
//     )
// }