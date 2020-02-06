import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignIn = (props) => {
    let [ email, setEmail ] = useState('')
    let [ password, setPassword ] = useState('')

    if (props.logStatus) {        
        return props.redirectPage('main')
    }
    else {
        return (
            <div className='SignUpContainer'>
                <h1 style={{fontWeight: 'bold'}}>Trello</h1>

                <div className='InputContainer'>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>이메일</span>
                        <input className="SignUpInput" onChange={(e) => { setEmail(e.target.value) }} 
                        type='email'/>
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호</span>
                        <input className="SignUpInput" onChange={(e) => { setPassword(e.target.value) }} 
                        type='password'/>
                    </div>
                </div>

                <button className="SignUpButton" onClick={() => { props.fetchlogin(email, password) }}>로그인</button>
                <Link to='/signup'>
                    <button className="SignUpButton">회원가입</button>
                </Link>
            </div>
        )
    }
}

export default SignIn;
