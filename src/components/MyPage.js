import React, { useState } from 'react'
import NavBar from './NavBar'
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
            setUnique(true)
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

    // 회원정보 수정
    const fetchModify = () => {
        if (!password || !username) {
            alert('빠진 정보가 없는지 확인해 주세요.')
        }
        else if (!isUniqueUsername) {
            alert('사용자 이름 중복 확인을 해 주세요.')
        }
        else {
            axios
            .put(`${serverAddress}/users/mypage/modify`, {
                email: props.userInfo.email,
                password: password,
                username: username
            })
            .then(res => {
                if (res.status === 200) {
                    props.modifyUserName(username)
                    alert('사용자 정보가 수정되었습니다.')
                }
                else {
                    alert(res.data)
                }
            })
            .catch(err => {
                console.log(err)
                alert('서버 연결 도중 에러가 발생하였습니다.')
            })
        }
        return;
    }

    if (!props.logStatus) {
        return (
            props.redirectPage('')
        )
    }

    else {

        return (        
            <div>
            <NavBar logOut={props.fetchLogOut}/>
            <div className='SignUpContainer'>
                
                <h1>My Page</h1>       
                
                <div className='InputContainer'>
                    <div className="SignUpDiv">
                        <h3>사용자 : {props.userInfo.email}</h3>
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
                        name='username' style={{width:'200px'}}
                        defaultValue={props.userInfo.username}/>
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
                        <span className='SignUpText'>비밀번호 변경</span>
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
                <button className="SignUpButton" onClick={props.fetchDelete}>회원 탈퇴</button>
                
            </div>
            </div>
        )
    }

}

export default MyPage;
