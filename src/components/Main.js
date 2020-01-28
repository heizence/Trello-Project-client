import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import CreateNewBoard from './AddNewBoardModal'

const Main = (props) => {

    if (!props.logStatus) {
        return props.redirectPage('')
    }
    else {
        //console.log('main 에서 보드 정보 확인 : ', props.board)
        return (
            <div>
                <NavBar logOut={props.fetchLogOut}/>
                <div className='PersonalBoards'>
                    <h1 style={{marginLeft: '20px', marginBottom: '20px', fontWeight: 'bold'}}>{props.userInfo.username} 님, 환영합니다</h1>
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
}

export default Main;
