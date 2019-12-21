import React, { Component } from 'react'

class SignUp extends Component {
    
    render() {
        return (
            <div className='SignUpContainer'>
                <h1 style={{fontWeight: 'bold'}}>Trello</h1>

                <div className='InputContainer'>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>이메일</span>
                        <input className="SignUpInput" />
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호</span>
                        <input className="SignUpInput" />
                    </div>
                </div>

                <button className="SignUpButton">로그인</button>
                <button className="SignUpButton">회원가입</button>
            </div>
        )
    }
}

export default SignUp;