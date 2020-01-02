import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import CreateNewBoard from './AddNewBoardModal'

const Main = (props) => {
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