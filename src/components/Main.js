import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import CreateNewBoard from './AddNewBoardModal'

// 서버로부터 불러온 보드의 모든 구조가 여기 main 에서 구현되어야 됨.
// fetch 함수들은 app 에서 불러오기
// main 에서는 보드 추가 함수만 사용. 나머지는 EachBoard 컴포넌트에 props로 넘겨줘야 함

const Main = (props) => {
    if (!props.logStatus) {
        return props.redirectPage('')
    }
    else {
        let boardData = props.fetchBoardData()
        console.log('메인에서 보드 데이터 확인 : ', boardData)
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


/* 백업
const Main = (props) => {
    if (!props.logStatus) {
        return props.redirectPage('')
    }
    else {
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
*/