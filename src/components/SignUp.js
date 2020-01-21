import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serverAddress from '../serverAddress'
import axios from 'axios'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            passwordCheck: '',
            username: '',
            isUniqueUsername: false
        }

        this.checkUniqueUsername = this.checkUniqueUsername.bind(this)
        this.fetchSignUp = this.fetchSignUp.bind(this)
    }

    checkUniqueUsername = (username) => {
        axios.post(`${serverAddress}/users/checkusername`, {
            username: username
        })
        .then(res => {
            if (res.data === true) {
                this.setState({isUniqueUsername: true});
                alert('사용 가능한 이름입니다.')
            }
            else {
                this.setState({isUniqueUsername: false})
                alert('이미 사용 중인 이름입니다.')
                return;
            }
        })
    }

    fetchSignUp() {
        if (!this.state.email || !this.state.password || !this.state.username) {
          alert('빠진 정보가 없는지 확인해 주세요.')
        }
        else if (!this.state.isUniqueUsername) {
            alert('사용자 이름 중복 확인을 해 주세요.')
        }
        else if (this.state.password !== this.state.passwordCheck) {
            alert('비밀번호를 다시 확인해 주세요.')
        }
        else {
            axios
            .post(`${serverAddress}/users/signup`, {
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            })
            .then(res => {
                if (res.statusText === "Created") {
                    alert("회원가입이 완료되었습니다.");
                } 
                else {
                    alert(res.data);
                }
            });
        }
        return;
    }

    render() {
        const { password, passwordCheck, username, isUniqueUsername } = this.state
        return (
            <div className='SignUpContainer'>
                <h3>회원가입</h3>

                <div className='InputContainer'>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>Email</span>
                        <input className="SignUpInput" onChange={(e) => {
                            this.setState({email: e.target.value})
                        }}
                        name='email' type='email'/>
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>Username</span>
                        <input className="SignUpInput" onChange={(e) => {
                            this.setState({
                                username: e.target.value,
                                isUniqueUsername: false
                            })
                        }}
                        name='username' style={{width:'200px'}}/>
                        <button className="SignUpButton" onClick={() => {
                            if (this.username !== '') {
                                this.checkUniqueUsername(username)
                            }
                            else {
                                alert('사용자 이름을 입력하세요.')
                            }
                        }}>중복 확인</button>
                        <div style={{
                            width: '150px', height: '40px', textAlign: 'left'
                        }}>
                        {isUniqueUsername ? '중복 확인되었습니다.' : ''}
                        </div>
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호</span>
                        <input className="SignUpInput" onChange={(e) => {
                            this.setState({password: e.target.value})
                        }} name='password' type='password'/>
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호 확인</span>
                        <input className="SignUpInput" onChange={(e) => {
                            this.setState({passwordCheck: e.target.value})
                        }} name='passwordCheck' type='password'/>                        
                    </div>
                    <div style={{
                        width: '150px', height: '40px', textAlign: 'left', 
                        color: password === passwordCheck ? 'green' : 'red'
                    }}>
                    {password !== '' & passwordCheck !== '' ? password === passwordCheck ? 
                    '비밀번호 일치' : '비밀번호 불일치' : ''}
                    </div>
                </div>

                <button className="SignUpButton" onClick={this.fetchSignUp}>가입</button>
                <Link to='/'>
                    <button className="SignUpButton">로그인 화면으로 이동</button>
                </Link>
            </div>
        )
    }
}

export default SignUp;
