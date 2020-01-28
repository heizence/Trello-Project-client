import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Login from './components/Login'
import Main from './components/Main';
import EachBoard from './components/EachBoard';
import SignUp from './components/SignUp';
import MyPage from './components/MyPage';
import axios from 'axios'
import serverAddress from './serverAddress'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        userName: ''
      },
      enteredIdtext: '',
      enteredPwtext: '',
      enteredUsername: '',
      loggedInfo: '',
      logStatus: false,

      setInfo: '',
      setInfo2: '',

      boardData: ''
    }

    this.enteredId = this.enteredId.bind(this)
    this.enteredPw = this.enteredPw.bind(this)
    this.enteredUsername = this.enteredUsername.bind(this)
    this.modifyUserName = this.modifyUserName.bind(this)

    this.fetchlogin = this.fetchlogin.bind(this)
    this.fetchLogOut = this.fetchLogOut.bind(this)
    this.fetchDelete = this.fetchDelete.bind(this)
    this.fetchFullBoardData = this.fetchFullBoardData.bind(this)

    this.redirectPage = this.redirectPage.bind(this)
    this.GetBoardTitles = this.GetBoardTitles.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.setInfo2 = this.setInfo2.bind(this)
    this.AddBoard = this.AddBoard.bind(this)
    this.ChangeBoardTitle = this.ChangeBoardTitle.bind(this)
    this.DeleteBoard = this.DeleteBoard.bind(this)
    this.AddList = this.AddList.bind(this)
    this.ChangeListTitle = this.ChangeListTitle.bind(this)
    this.DeleteList = this.DeleteList.bind(this)
    this.AddCard = this.AddCard.bind(this)
    this.ChangeCardTitle = this.ChangeCardTitle.bind(this)
    this.DeleteCard = this.DeleteCard.bind(this)
    this.AddCard = this.AddCard.bind(this)
    this.ChangeCardTitle = this.ChangeCardTitle.bind(this)
    this.DeleteCard = this.DeleteCard.bind(this)
    this.AddOrChangeCardDescription = this.AddOrChangeCardDescription.bind(this)

  }

  // 아이디, 비밀번호 입력
  enteredId(e) {
    this.setState({
      enteredIdtext: e.target.value
    });
  }

  enteredPw(e) {
    this.setState({
      enteredPwtext: e.target.value
    });
  }

  enteredUsername(e) {
    this.setState({
      enteredUsername: e.target.value
    });
  }

  // 회원정보 수정(사용자 이름)
  modifyUserName(name) {
    let change = this.state.user
    change.username = name
    this.setState({
      user: change
    })
  }

  // 로그인
  fetchlogin() {
     axios
      .post(`${serverAddress}/users/signin`, {
        email: this.state.enteredIdtext,
        password: this.state.enteredPwtext
      })
      .then(res => {
        if (res.status === 200) {
          let { email, username } = res.data
          this.setState({
            ...this.state,
            user: {
              email, username
            },
            logStatus: true
          })
          // 로그인 되면 보드 데이터 불러오기
          this.fetchFullBoardData()

          alert('로그인 되었습니다.')
        }
        else {
          alert('아이디 혹은 비밀번호가 틀립니다.')
        }
      }) 
  }

  // 로그아웃
  fetchLogOut() {
    let isSure = window.confirm('로그아웃 하시겠습니까?')

    if (isSure) {
      axios.post(`${serverAddress}/users/signout`)
      .then(res => {
        alert(res.data)
      })
      this.setState({logStatus: false})
    }
  }

  // 회원 탈퇴
  fetchDelete() {
    let isSure = window.confirm('정말로 탈퇴하시겠습니까? 모든 정보가 다 삭제됩니다.')

    if (isSure) {
      axios
      .post(`${serverAddress}/users/mypage`, {
        email: this.state.user.email
      })
      .then((res) => {
          if (res.status === 200) {
              this.setState({logStatus: false})
              alert('탈퇴되었습니다.')
          }
          else {
              alert(res.data)
          }
      })
    }
  }
  // 완전하게 조립된 보드 불러오기
  fetchFullBoardData() {
    axios.get(`${serverAddress}/users/getBoardData/?user=${this.state.user.email}`)
    .then(res => {
      this.setState({boardData: res.data})
      console.log('state확인 : ', this.state.boardData)
    })
  }
  
  // redirect
  redirectPage(address) {
    if (address === '') {
      return <Redirect to='/' />
    }
    else {
      return <Redirect to={`/${address}`} />;
    }
  }

  // 보드 이름 추출하기
  GetBoardTitles(board) {    
    let boardTitles = []

    for (let i in board) {
      boardTitles.push(board[i].boardTitle)
    }

    return boardTitles
  }

  // 추가, 변경 시 사용할 정보를 임시로 저장
  setInfo(e, text) {
    if (e) {
      this.setState({
        setInfo: e.target.value
      })
      return;
    }
    else if (text) {
      this.setState({
        setInfo: text
      })
      return;
    }
    //console.log('SET INFO : ', this.state.setInfo)
  }

  setInfo2(e, text) {
    if (e) {
      this.setState({
        setInfo2: e.target.value
      })
      return;
    }
    else if (text) {
      this.setState({
        setInfo2: text
      })
    }
    //console.log('SET INFO2 : ', this.state.setInfo2)
  }

  // 보드 추가
  AddBoard() {    
    this.setState({
      boardData: [
        ...this.state.boardData,
        {
          boardTitle: this.state.setInfo,
          boardContents : []
        }
      ],
      setInfo: ''
    })
    //console.log('새로운 보드 추가됨... ', this.state.boardData)
    
    axios.post(`${serverAddress}/users/boardData/addBoard`, {
      email : this.state.user.email,
      newBoardTitle: this.state.setInfo
    })
  }

  // 보드 제목 변경
  ChangeBoardTitle(oldTitle) {
    if (this.state.setInfo === '') {
      return;
    }

    let stateToChange = this.state.boardData

    for (let i=0; i<stateToChange.length; i++) {
      if (stateToChange[i].boardTitle === oldTitle) {
        stateToChange[i].boardTitle = this.state.setInfo
        break;
      }
    }
    
    this.setState({
      boardData: stateToChange,
      setInfo: ''
    })

    //console.log('보드 제목 변경됨... ', this.state.boardData)

    axios.put(`${serverAddress}/users/boardData/modifyBoard`, {
      email : this.state.user.email,
      oldBoardTitle: oldTitle,
      newBoardTitle: this.state.setInfo
    })
    
  }
  
  // 보드 삭제
  DeleteBoard(boardTitle) {
    let stateToChange = this.state.boardData

    for (let i=0; i<stateToChange.length; i++) {
      if (stateToChange[i].boardTitle === boardTitle) {
        stateToChange.splice(i, 1)
        break;
      }
    }

    this.setState({
      boardData: stateToChange
    })

    //console.log('보드 삭제됨... ', this.state.boardData)

    axios.post(`${serverAddress}/users/boardData/deleteBoard`, {
      email : this.state.user.email,
      boardTitle: boardTitle
    })
  }

  // 리스트 추가
  AddList(boardTitle) {
    let key

    this.state.boardData.forEach((board, index) => {
      if (board.boardTitle === boardTitle) {
        key = index
        return
      }
    })
    
    let newList = {
      title: this.state.setInfo,
      lists: []
    }

    this.setState(prevState => ({
      boardData: prevState.boardData.map((board, index) => {
        if (index === key) {
          board.boardContents.push(newList)
        }
        return board
      })
    }))

    //console.log('새로운 리스트 추가됨... ', this.state.boardData[key])

    axios.post(`${serverAddress}/users/listData/addList`, {
      email : this.state.user.email,
      boardTitle: boardTitle,
      newListTitle: this.state.setInfo
    })
  }

  // 리스트 수정
  ChangeListTitle(boardTitle, oldListTitle) {
    let key

    this.state.boardData.forEach((board, index) => {
      if (board.boardTitle === boardTitle) {
        key = index
        return
      }
    })

    this.setState(prevState => ({
      boardData: prevState.boardData.map((board, index) => {
        if (index === key) {
          board.boardContents.map(list => {
            if (list.title === oldListTitle) {
              list.title = this.state.setInfo
              console.log('리스트 수정됨... ', list)
            }
            return list
          })
        }
        return board
      }),
    }))

    axios.put(`${serverAddress}/users/listData/modifyList`, {
      email : this.state.user.email,
      boardTitle: boardTitle,
      oldListTitle: oldListTitle,
      newListTitle: this.state.setInfo
    })

    this.setState({setInfo: ''})
  }

  // 리스트 삭제
  DeleteList(boardTitle, listTitle) {
    let key

    this.state.boardData.forEach((board, index) => {
      if (board.boardTitle === boardTitle) {
        key = index
        return
      }
    })

    this.setState(prevState => ({
      boardData: prevState.boardData.map((board, index) => {
        if (index === key) {
          for (let i=0; i<board.boardContents.length; i++) {

            if (board.boardContents[i].title === listTitle) {
              board.boardContents.splice(i, 1)
              //console.log('리스트 삭제됨... ', board.boardContents)
              break
            }
          }
        }
        return board
      })
    }))

    axios.post(`${serverAddress}/users/listData/deleteList`, {
      email : this.state.user.email,
      boardTitle: boardTitle,
      listTitle: listTitle
    })

  }

  // 카드 추가
  AddCard(boardTitle, listTitle) {
    let key

    this.state.boardData.forEach((board, index) => {
      if (board.boardTitle === boardTitle) {
        key = index
        return
      }
    })
    
    let newCard = {
      contentTitle: this.state.setInfo, 
      contentText: '' || this.state.setInfo2
    }

    this.setState(prevState => ({
      boardData: prevState.boardData.map((board, index) => {
        if (index === key) {
          board.boardContents.map((list) => {
            if (list.title === listTitle) {
              list.lists.push(newCard)
            }
            return list
          })
        }
        return board
      }),
    }))

    //console.log('새로운 카드 추가됨... ', this.state.boardData[key])

    axios.post(`${serverAddress}/users/cardData/addCard`, {
      email : this.state.user.email,
      boardTitle: boardTitle,
      listTitle: listTitle,
      newContentTitle: this.state.setInfo,
      contentText: '' || this.state.setInfo2
    })

    this.setState({setInfo: ''})
  }
  
  // 카드 제목 변경
  ChangeCardTitle(boardTitle, listTitle, oldCardTitle) {
    this.setState({
      setInfo: ''
    })

    if (this.state.setInfo === '') {
      return;
    }

    let key

    this.state.boardData.forEach((board, index) => {
      if (board.boardTitle === boardTitle) {
        key = index
        return
      }
    })

    this.setState(prevState => ({
      boardData: prevState.boardData.map((board, index) => {
        if (index === key) {
          board.boardContents.map((list) => {
            if (list.title === listTitle) {
              list.lists.map(card => {
                if (card.contentTitle === oldCardTitle) {
                  card.contentTitle = this.state.setInfo
                }
                return card
              })
            }
            return list
          })
        }
        return board
      }),
    }))

    //console.log('카드 수정됨... ', this.state.boardData[key])

    axios.put(`${serverAddress}/users/cardData/modifyCard`, {
      email : this.state.user.email,
      boardTitle: boardTitle,
      listTitle: listTitle,
      oldContentTitle: oldCardTitle,
      newContentTitle: this.state.setInfo
    })

    this.setState({setInfo: ''})
  }

  // 카드 삭제
  DeleteCard(boardTitle, listTitle, cardTitle) {
    let key

    this.state.boardData.forEach((board, index) => {
      if (board.boardTitle === boardTitle) {
        key = index
        return
      }
    })

    this.setState(prevState => ({
      boardData: prevState.boardData.map((board, index) => {
        if (index === key) {
          for (let i=0; i<board.boardContents.length; i++) {
            let list = board.boardContents

            if (list[i].title === listTitle) {
              for (let j=0; j<list[i].lists.length; j++) {
                if (list[i].lists[j].contentTitle === cardTitle) {
                  list[i].lists.splice(j, 1)
                  break;
                }
              }
              break
            }
          }
        }
        return board
      })
    }))

    //console.log('카드 삭제됨... ', this.state.boardData[key])

    axios.post(`${serverAddress}/users/cardData/deleteCard`, {
      email : this.state.user.email,
      boardTitle: boardTitle,
      listTitle: listTitle,
      contentTitle: cardTitle
    })

  }

  // 카드 내용 변경
  AddOrChangeCardDescription(boardTitle, listTitle, cardTitle) {
    if (this.state.setInfo2 === '') {
      return;
    }

    let key

    this.state.boardData.forEach((board, index) => {
      if (board.boardTitle === boardTitle) {
        key = index
        return
      }
    })

    this.setState(prevState => ({
      boardData: prevState.boardData.map((board, index) => {
        if (index === key) {
          for (let i=0; i<board.boardContents.length; i++) {
            let list = board.boardContents

            if (list[i].title === listTitle) {
              for (let j=0; j<list[i].lists.length; j++) {
                if (list[i].lists[j].contentTitle === cardTitle) {
                  list[i].lists[j].contentText = this.state.setInfo2

                  //console.log('카드 내용 추가/수정됨 : ', list[i])
                  break;
                }
              }
              break
            }
          }
        }
        return board
      }),
    }))

    axios.put(`${serverAddress}/users/cardData/modifyCard`, {
      email : this.state.user.email,
      boardTitle: boardTitle,
      listTitle: listTitle,
      oldContentTitle: cardTitle,
      contentText: this.state.setInfo2
    })

    this.setState({setInfo2: ''})
  }

  render() {
    return (
      <div className="App">
        <Route path="/" exact 
        render={() => 
        <Login fetchlogin={this.fetchlogin} redirectPage={this.redirectPage}
        enteredId={this.enteredId} enteredPw={this.enteredPw}
        logStatus={this.state.logStatus}/>} 
        />
        <Route path="/signup" exact 
        render={() =>
        <SignUp fetchSignUpx={this.fetchSignUp} redirectPage={this.redirectPage}
        enteredId={this.enteredId} enteredPw={this.enteredPw} 
        enteredUsername={this.enteredUsername}/>} 
        />
        <Route path="/mypage" exact
        render={() =>
          <MyPage 
          logStatus={this.state.logStatus}
          userInfo={this.state.user}
          modifyUserName={this.modifyUserName}
          fetchLogOut={this.fetchLogOut}
          fetchDelete={this.fetchDelete}
          redirectPage={this.redirectPage}
          />}
        />
        <Route path="/main" exact 
        render={() => 
          <Main 
          fetchLogOut={this.fetchLogOut}
          logStatus={this.state.logStatus}
          redirectPage={this.redirectPage}
          userInfo={this.state.user}
          board={this.GetBoardTitles(this.state.boardData)}
          AddBoard={this.AddBoard} 
          setInfo={this.setInfo}
          />} 
        />
        <Route path="/main/:boardIndex" exact
        render={({ match }) => 
          <EachBoard           
          logStatus={this.state.logStatus}
          fetchLogOut={this.fetchLogOut}
          redirectPage={this.redirectPage}
          board={this.state.boardData[match.params.boardIndex]}
          setInfo={this.setInfo}
          setInfo2={this.setInfo2}
          ChangeBoardTitle={this.ChangeBoardTitle}
          DeleteBoard={this.DeleteBoard}
          AddList={this.AddList}
          ChangeListTitle={this.ChangeListTitle}
          DeleteList={this.DeleteList}
          AddCard={this.AddCard}
          ChangeCardTitle={this.ChangeCardTitle}
          DeleteCard={this.DeleteCard}
          AddOrChangeCardDescription={this.AddOrChangeCardDescription}
          />
        }
        />

      </div>
    );
  }  
}

export default App;
