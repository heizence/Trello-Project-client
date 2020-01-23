import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = (props) => {
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
                        <input className="SignUpInput" onChange={props.enteredId} type='email'/>
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호</span>
                        <input className="SignUpInput" onChange={props.enteredPw} type='password'/>
                    </div>
                </div>

                <button className="SignUpButton" onClick={props.fetchlogin}>로그인</button>
                <Link to='/signup'>
                    <button className="SignUpButton">회원가입</button>
                </Link>
            </div>
        )
    }
}

export default SignIn;
