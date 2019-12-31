import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
    return (
        <div className='NavBar'>
            <Link to='/main'>
                <span id='NavText1'>Main</span>
            </Link>

            <div id='NavText2'>
                <Link to='/mypage'>
                    <span className='text'>MyPage</span>
                </Link>
                <Link to='/'>
                    <span className='text'>Logout</span>
                </Link>
            </div>
        </div>
    )
}

export default NavBar;