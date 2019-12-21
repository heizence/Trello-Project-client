import React from 'react'
import NavBar from './NavBar'

function Main(props) {
    const boardList = ['b1', 'b2', 'b3', 'b4', 'b5']
    return (
        <div>
            <NavBar />
            <div className='PersonalBoards'>
                <h3 style={{marginLeft: '20px', marginBottom: '20px'}}>Personal Boards</h3>
                {boardList.map((board, index) => (
                    <div className='EachBoard' index={index}>{board}</div>
                ))}
                <div className='EachBoard' 
                style={{backgroundColor: '#c3c9c5', color: 'black'}}>Create new board</div>
            </div>
        </div>
    )
}

export default Main;