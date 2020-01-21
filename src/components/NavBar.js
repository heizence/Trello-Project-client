import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    return (
        <div className='NavBar'>
            <Link to='/main'>
                <span id='NavText1'>Main</span>
            </Link>

            <div id='NavText2'>
                <Link to='/mypage'>
                    <span className='text'>MyPage</span>
                </Link>
                
                <span className='text' onClick={props.logOut}>Logout</span>
               
            </div>
        </div>
    )
}

export default NavBar;
