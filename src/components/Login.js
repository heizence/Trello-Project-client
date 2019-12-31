import React, { Component } from 'react'
import server from '../serverAddress'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmail (e) {
        this.setstate({ email : e.target.value })
    }

    handlePassword (e) {
        this.setState({ password: e.target.value })
    }

    logIn (email, password) {
        let loginData = {
            email,
            password
        }

        fetch(`${server}/user/signin`, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('login', res)

            document.cookie = `user = ${res.data.token}`;
            return res.data.token
        })
        .then()
    }    

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