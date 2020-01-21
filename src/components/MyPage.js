import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import serverAddress from '../serverAddress'
import axios from 'axios'

const MyPage = (props) => {    
    let [password, setpassword] = useState(props.userInfo.password)
    let [passwordCheck, setpasswordCheck] = useState('')
    let [username, setUsername] = useState(props.userInfo.username)
    let [isUniqueUsername, setUnique] = useState(false)

    const checkUniqueUsername = (username) => {
        if (username === props.userInfo.username) {
            alert('사용 가능한 이름입니다.')
        }
        else {
            axios.post(`${serverAddress}/users/checkusername`, {
                username: username
            })
            .then(res => {
                if (res.data === true) {
                    setUnique(true)
                    alert('사용 가능한 이름입니다.')
                }
                else {
                    alert('이미 사용 중인 이름입니다.')
                    return;
                }
            })
        }
    }

    const fetchModify = () => {
        if (!password || !username) {
            alert('빠진 정보가 없는지 확인해 주세요.')
        }
        else if (!isUniqueUsername) {
            alert('사용자 이름 중복 확인을 해 주세요.')
        }
        else {
            axios
            .put(`${serverAddress}/users/mypage`, {
                email: props.userInfo.email,
                password: password,
                username: username
            })
            .then(res => {
                if (res.status === 200) {
                    alert('사용자 정보가 수정되었습니다.')
                }
                else {
                    alert(res.data)
                }
            })
        }
        return;
    }

    return (
        <div className='SignUpContainer'>
            <h3>My Page</h3>       
            
            <div className='InputContainer'>
                <div className="SignUpDiv">
                    <span className='SignUpText'>Email</span>
                    <div className="SignUpInput">{props.userInfo.email}</div>
                </div>
                <div style={{
                    fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'left'
                }}>회원 정보 수정</div>
                <div className="SignUpDiv">
                    <span className='SignUpText'>Username</span>
                    <input className="SignUpInput" onChange={(e) => {
                        setUsername(e.target.value)
                        setUnique(false)
                    }}
                    name='username' style={{width:'200px'}}/>
                    <button className="SignUpButton" onClick={() => {
                        if (username !== '') {
                            checkUniqueUsername(username)
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
                        setpassword(e.target.value)
                    }} name='password' type='password'/>
                </div>
                <div className="SignUpDiv">
                    <span className='SignUpText'>비밀번호 확인</span>
                    <input className="SignUpInput" onChange={(e) => {
                        setpasswordCheck(e.target.value)
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

            <button className="SignUpButton" onClick={fetchModify}>수정</button>
            <Link to='/main'>
                <button className="SignUpButton">메인 화면으로 이동</button>
            </Link>
        </div>
    )
    
}

export default MyPage;

/* 백업

const MyPage = (props) => {
    let [password, setpassword] = useState('')
    let [passwordCheck, setpasswordCheck] = useState('')

    return (
        <div className='SignUpContainer'>
            <h3>My Page</h3>       
            
            <div className='InputContainer'>
                <div style={{
                    fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'left'
                }}>회원 정보 수정</div>
                <div className="SignUpDiv">
                    <span className='SignUpText'>Username</span>
                    <input className="SignUpInput" onChange={props.enteredUsername}
                    name='username' style={{width:'200px'}}/>
                    <button className="SignUpButton">중복 확인</button>
                </div>
                <div className="SignUpDiv">
                    <span className='SignUpText'>비밀번호</span>
                    <input className="SignUpInput" onChange={(e) => {
                        props.enteredPw(e)
                        setpassword(e.target.value)
                    }} name='password' type='password'/>
                </div>
                <div className="SignUpDiv">
                    <span className='SignUpText'>비밀번호 확인</span>
                    <input className="SignUpInput" onChange={(e) => {
                        setpasswordCheck(e.target.value)
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

            <button className="SignUpButton">수정</button>
            <Link to='/main'>
                <button className="SignUpButton">메인 화면으로 이동</button>
            </Link>
        </div>
    )
    
}

*/