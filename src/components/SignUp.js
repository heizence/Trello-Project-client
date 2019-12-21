import React, { Component } from 'react'

class SignUp extends Component {
    
    render() {
        return (
            <div className='SignUpContainer'>
                <h3>회원가입</h3>

                <div className='InputContainer'>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>이메일</span>
                        <input className="SignUpInput" />
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호</span>
                        <input className="SignUpInput" />
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호 확인</span>
                        <input className="SignUpInput" />
                    </div>
                </div>

                <button className="SignUpButton">가입</button>
                <button className="SignUpButton">로그인 화면으로 이동</button>
            </div>
        )
    }
}

export default SignUp;