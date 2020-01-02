import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login'
import Main from './components/Main';
import EachBoard from './components/EachBoard';
import SignUp from './components/SignUp';
import MyPage from './components/MyPage';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boardData: [
        {
            id: 0,
            boardTitle: 'a1',
            boardContents : [
                {
                    title: 'Things To Do',
                    lists: [
                        {contentTitle: '부족한 부분 파악하기', contentText: ''}, 
                        {contentTitle: '복습', contentText: ''}
                    ]
                },
                {
                    title: 'Doing',
                    lists: [
                        {contentTitle: '블로깅하기', contentText: '블로깅 열심히 하자!'}, 
                        {contentTitle: 'TIL 적기', contentText: '빼먹지 말자'}
                    ]
                },
                {
                    title: 'Done',
                    lists: []
                }
            ]
        },
        {
            id: 1,
            boardTitle: 'a2',
            boardContents : [
                {
                    title: 'Things To Do(a2)',
                    lists: [
                        {contentTitle: '부족한 부분 파악하기(a2)', contentText: '(a2)'}, 
                        {contentTitle: '복습(a2)', contentText: ''}
                    ]
                },
                {
                    title: 'Doing(a2)',
                    lists: [
                        {contentTitle: '블로깅하기(a2)', contentText: '블로깅 열심히 하자!(a2)'}, 
                        {contentTitle: 'TIL 적기(a2)', contentText: '빼먹지 말자(a2)'}
                    ]
                },
                {
                    title: 'Done(a2)',
                    lists: []
                }
            ]
        },
      ],
      setInfo: '',
      setInfo2: '',
    }

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

  // 보드 이름 가져오기
  GetBoardTitles() {    
    let board = this.state.boardData
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

    console.log('SET INFO : ', this.state.setInfo)
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
    console.log('SET INFO2 : ', this.state.setInfo2)
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
      ]
    })
    console.log('새로운 보드 추가됨... ', this.state.boardData)
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

    console.log('보드 제목 변경됨... ', this.state.boardData)
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

    console.log('보드 삭제됨... ', this.state.boardData)
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
    console.log('새로운 리스트 추가됨... ', this.state.boardData[key])
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
      setInfo: ''
    }))

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
              console.log('리스트 삭제됨... ', board.boardContents)
              break
            }
          }
        }
        return board
      })
    }))

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
      contentText: ''
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
      setInfo: ''
    }))

    console.log('새로운 카드 추가됨... ', this.state.boardData[key])
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
      setInfo: ''
    }))

    console.log('카드 수정됨... ', this.state.boardData[key])
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

    console.log('카드 삭제됨... ', this.state.boardData[key])

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

                  console.log('카드 내용 추가/수정됨 : ', list[i])
                  break;
                }
              }
              break
            }
          }
        }
        return board
      }),
      setInfo2: ''
    }))
    
  }

  
  render() {
    console.log('상태1 : ', this.state.setInfo, '\n', '상태2 : ', this.state.setInfo2)
    return (
      <div className="App">
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/main" exact 
        render={() => 
          <Main 
          board={this.GetBoardTitles()}
          AddBoard={this.AddBoard} 
          setInfo={this.setInfo}/>} 
        />
        <Route path="/main/:boardIndex" exact
        render={({ match }) => 
          <EachBoard           
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