import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn'
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
        userName: '',
        _id: ''
      },
      loggedInfo: '',
      logStatus: false,

      setInfo: '',
      setInfo2: '',

      boardData: ''
    }

    this.modifyUserName = this.modifyUserName.bind(this)

    this.fetchlogin = this.fetchlogin.bind(this)
    this.fetchLogOut = this.fetchLogOut.bind(this)
    this.fetchDelete = this.fetchDelete.bind(this)
    this.fetchFullBoardData = this.fetchFullBoardData.bind(this)

    this.redirectPage = this.redirectPage.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.setInfo2 = this.setInfo2.bind(this)

    this.AddBoard = this.AddBoard.bind(this)
    this.ChangeBoardTitle = this.ChangeBoardTitle.bind(this)
    this.DeleteBoard = this.DeleteBoard.bind(this)

    this.AddList = this.AddList.bind(this)
    this.ChangeListTitle = this.ChangeListTitle.bind(this)
    this.DeleteList = this.DeleteList.bind(this)    

    this.AddCard = this.AddCard.bind(this)
    this.ChangeCard = this.ChangeCard.bind(this)
    this.DeleteCard = this.DeleteCard.bind(this)
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
  fetchlogin(email, password) {
     axios
      .post(`${serverAddress}/users/signin`, {
        email,
        password
      })
      .then(res => {
        if (res.status === 200) {
          let { email, username, _id } = res.data
          this.setState({
            ...this.state,
            user: {
              email, username, _id
            },
            logStatus: true
          })
          // 로그인 되면 보드 데이터 불러오기
          this.fetchFullBoardData()
          alert('로그인 되었습니다.')
        }
        else if (res.status === 201) {
          alert('아이디 혹은 비밀번호가 틀립니다.')
        }
      }) 
      .catch(err => {
        console.log(err)
        alert('서버 연결 중 에러가 발생하였습니다.')
      })
  }

  // 로그아웃
  fetchLogOut() {
    let isSure = window.confirm('로그아웃 하시겠습니까?')

    if (isSure) {
      axios.post(`${serverAddress}/users/signout`)
      .then(res => {
        if (res.status === 200) {
          this.setState({logStatus: false})
          alert('로그아웃 되었습니다.')
        }
      })
      .catch(err => {
        console.log(err)
        alert('서버 연결 중 에러가 발생하였습니다.')
      })
    }
  }

  // 회원 탈퇴
  fetchDelete() {
    let isSure = window.confirm('정말로 탈퇴하시겠습니까? 모든 정보가 다 삭제됩니다.')

    if (isSure) {
      axios
      .delete(`${serverAddress}/users/mypage/secession/?user=${this.state.user._id}`, {
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
      .catch(err => {
        console.log(err)
        alert('서버 연결 중 에러가 발생하였습니다.')
      })
    }
  }

  // 완전하게 조립된 보드 불러오기
  fetchFullBoardData() {
    console.log('사용자 보드 데이터 불러옴')
    axios.get(`${serverAddress}/users/getBoardData/?user=${this.state.user._id}`)
    .then(res => {
      this.setState({boardData: res.data.boards})
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
    console.log('setInfo 값 : ', this.state.setInfo)
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
    console.log('setInfo2 값 : ', this.state.setInfo2)
  }

  // 보드 추가
  AddBoard() {    
    if (this.state.setInfo === '') {
      alert('보드 제목을 입력해 주세요.')
    }
    else {
      axios.post(`${serverAddress}/users/boardData/addBoard`, {
        userId: this.state.user._id,
        boardTitle: this.state.setInfo
      })
      .then(res => {
        if (res.status === 200) {
          let { _id, boardTitle } = res.data
          this.setState({
            boardData: [
              ...this.state.boardData,
              {
                lists : [],
                _id,
                boardTitle              
              }
            ],
            setInfo: ''
          })
        }
        else { alert('에러가 발생하였습니다.')}
      })
      .catch(err => {
        console.log(err)
        alert('서버 연결 중 에러가 발생하였습니다.')
      })
    }
  }

  // 보드 제목 변경
  ChangeBoardTitle(boardId) {
    axios.put(`${serverAddress}/users/boardData/modifyBoard`, {
      boardId,
      newBoardTitle: this.state.setInfo
    })
    .then(res => {
      if (res.status === 200) {
        let stateToChange = this.state.boardData

        for (let i=0; i<stateToChange.length; i++) {
          if (stateToChange[i]._id === boardId) {
            stateToChange[i].boardTitle = res.data.boardTitle
            break;
          }
        }
        
        this.setState({
          boardData: stateToChange,
          setInfo: ''
        })
      }
      else { alert('에러가 발생하였습니다.')}
    })
    .catch(err => {
      console.log(err)
      alert('서버 연결 중 에러가 발생하였습니다.')
    })
  }
  
  // 보드 삭제
  DeleteBoard(boardId) {
    axios.delete(`${serverAddress}/users/boardData/deleteBoard/?board=${boardId}`)
    .then(res => {
      if (res.status === 200) {
        let stateToChange = this.state.boardData

        for (let i=0; i<stateToChange.length; i++) {
          if (stateToChange[i]._id === boardId) {
            stateToChange.splice(i, 1)
            break;
          }
        }

        this.setState({
          boardData: stateToChange
        })
        alert('삭제되었습니다')
      }
      else { alert('에러가 발생했습니다.')}
    })
    .catch(err => {
      console.log(err)
      alert('서버 연결 중 에러가 발생하였습니다.')
    })
  }

  // 리스트 추가
  AddList(boardId) {
    if (this.state.setInfo === '') {
      alert('리스트 제목을 입력해 주세요.')
    }
    else {
      axios.post(`${serverAddress}/users/listData/addList`, {
        boardId,
        listTitle: this.state.setInfo
      })
      .then(res => {
        if (res.status === 200) {
          let { _id, listTitle } = res.data
          let key
          let newList = {
            cards: [], 
            _id, 
            listTitle
          }

          this.state.boardData.forEach((board, index) => {
            if (board._id === boardId) {
              key = index
              return
            }
          })

          this.setState(prevState => ({
            boardData: prevState.boardData.map((board, index) => {
              if (index === key) {
                board.lists.push(newList)
              }
              return board
            }),
            setInfo: ''
          }))
        }
        else { alert('에러가 발생하였습니다.') }
      })
      .catch(err => {
        console.log(err)
        alert('서버 연결 중 에러가 발생하였습니다.')
      })
    }
  }

  // 리스트 수정
  ChangeListTitle(boardId, listId) {
    axios.put(`${serverAddress}/users/listData/modifyList`, {
      listId,
      newListTitle: this.state.setInfo
    })
    .then(res => {
      if (res.status === 200) {
        let key

        this.state.boardData.forEach((board, index) => {
          if (board._id === boardId) {
            key = index
            return
          }
        })

        this.setState(prevState => ({
          boardData: prevState.boardData.map((board, index) => {
            if (index === key) {
              board.lists.map(list => {
                if (list._id === listId) {
                  list.listTitle = res.data.listTitle
                }
                return list
              })
            }
            return board
          }),
          setInfo: ''
        }))
      }
      else { alert('에러가 발생하였습니다.') }
    })
    .catch(err => {
      console.log(err)
      alert('서버 연결 중 에러가 발생하였습니다.')
    })
  }

  // 리스트 삭제
  DeleteList(boardId, listId) {
    axios.delete(`${serverAddress}/users/listData/deleteList/?list=${listId}`)
    .then(res => {
      if (res.status === 200) {
        let key

        this.state.boardData.forEach((board, index) => {
          if (board._id === boardId) {
            key = index
            return
          }
        })
    
        this.setState(prevState => ({
          boardData: prevState.boardData.map((board, index) => {
            if (index === key) {
              for (let i=0; i<board.lists.length; i++) {
    
                if (board.lists[i]._id === listId) {
                  board.lists.splice(i, 1)
                  break
                }
              }
            }
            return board
          })
        }))
        alert('삭제되었습니다')
      }
      else { alert('에러가 발생하였습니다.') }
    })
    .catch(err => {
      console.log(err)
      alert('서버 연결 중 에러가 발생하였습니다.')
    })
  }

  // 카드 추가
  AddCard(boardId, listId) {
    if (this.state.setInfo === '') { 
      alert('카드 제목을 입력해 주세요.')
    }
    else {
      axios.post(`${serverAddress}/users/cardData/addCard`, {
        listId,
        cardTitle: this.state.setInfo,
        contentText: '' || this.state.setInfo2,
      })
      .then(res => {
        if (res.status === 200) {
          let { _id, cardTitle, contentText } = res.data
          let key

          this.state.boardData.forEach((board, index) => {
            if (board._id === boardId) {
              key = index
              return
            }
          })
          
          let newCard = {
            _id,
            cardTitle,
            contentText
          }
      
          this.setState(prevState => ({
            boardData: prevState.boardData.map((board, index) => {
              if (index === key) {
                board.lists.map((list) => {
                  if (list._id === listId) {
                    list.cards.push(newCard)
                  }
                  return list
                })
              }
              return board
            }),
            setInfo: '',
            setInfo2: ''
          }))
        }
        else { alert('에러가 발생하였습니다.') }
      })
      .catch(err => {
        console.log(err)
        alert('서버 연결 중 에러가 발생하였습니다.')
      })
    }
  }
  
  // 카드 제목 & 내용 변경
  ChangeCard(boardId, listId, cardId) {
    axios.put(`${serverAddress}/users/cardData/modifyCard`, {
      cardId,
      newCardTitle: this.state.setInfo,
      contentText: this.state.setInfo2
    })
    .then(res => {
      if (res.status === 200) {  
        let key
    
        this.state.boardData.forEach((board, index) => {
          if (board._id === boardId) {
            key = index
            return
          }
        })
    
        this.setState(prevState => ({
          boardData: prevState.boardData.map((board, index) => {
            if (index === key) {
              board.lists.map((list) => {
                if (list._id === listId) {
                  list.cards.map(card => {
                    if (card._id === cardId) {
                      for (let i in res.data) {
                        card[i] = res.data[i]
                      }
                    }
                    return card
                  })
                }
                return list
              })
            }
            return board
          }),
          setInfo: '',
          setInfo2: ''
        }))
      }
      else { alert('에러가 발생하였습니다.') }
    })
    .catch(err => {
      console.log(err)
      alert('서버 연결 중 에러가 발생하였습니다.')
    })
  }

  // 카드 삭제
  DeleteCard(boardId, listId, cardId) {
    axios.delete(`${serverAddress}/users/cardData/deleteCard/?card=${cardId}`)
    .then(res => {
      if (res.status === 200) {
        let key

        this.state.boardData.forEach((board, index) => {
          if (board._id === boardId) {
            key = index
            return
          }
        })
    
        this.setState(prevState => ({
          boardData: prevState.boardData.map((board, index) => {
            if (index === key) {
              for (let i=0; i<board.lists.length; i++) {
                let list = board.lists
    
                if (list[i]._id === listId) {
                  for (let j=0; j<list[i].cards.length; j++) {
                    if (list[i].cards[j]._id === cardId) {
                      list[i].cards.splice(j, 1)
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
        alert('삭제되었습니다')
      }
      else { alert('에러가 발생하였습니다.') }
    })
    .catch(err => {
      console.log(err)
      alert('서버 연결 중 에러가 발생하였습니다.')
    })
  }         

  render() {
    return (
      <div className="App">
        <Route path="/" exact 
        render={() => 
        <SignIn fetchlogin={this.fetchlogin} redirectPage={this.redirectPage}
        logStatus={this.state.logStatus}/>} 
        />
        <Route path="/signup" exact 
        render={() =>
        <SignUp />} 
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
          ChangeCard={this.ChangeCard}
          />
        }
        />

      </div>
    );
  }  
}

export default App;
