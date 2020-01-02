import React, { Component } from 'react'

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            username: '',
            password: '',
            passwordCheck: ''
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        let name = e.target.name

        this.setState(
            this.setState({
                ...this.state,
                [name]: e.target.value
            })
        )
    }
    
    render() {
        return (
            <div className='SignUpContainer'>
                <h3>MyPage</h3>

                <div className='InputContainer'>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>Email</span>
                        <input className="SignUpInput" onChange={this.onChange} name='email' type='email'/>
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>Username</span>
                        <input className="SignUpInput" onChange={this.onChange}
                        name='username' style={{width:'200px'}}/>
                        <button className="SignUpButton">중복 확인</button>
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호</span>
                        <input className="SignUpInput" onChange={this.onChange} name='password' type='password'/>
                    </div>
                    <div className="SignUpDiv">
                        <span className='SignUpText'>비밀번호 확인</span>
                        <input className="SignUpInput" onChange={this.onChange} name='passwordCheck' type='password'/>                        
                    </div>
                </div>

                <button className="SignUpButton">가입</button>
                <button className="SignUpButton">로그인 화면으로 이동</button>
            </div>
        )
    }
}

export default SignUp;