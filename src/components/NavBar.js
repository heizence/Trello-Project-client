import React from 'react'
import '../App.css'

function NavBar(props) {
    return (
        <div className='NavBar'>
            <span id='NavText1'>Main</span>

            <div id='NavText2'>
                <span className='text'>MyPage</span>
                <span className='text'>Logout</span>    
            </div>
        </div>
    )
}

export default NavBar;