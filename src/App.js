import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login'
import Main from './components/Main';
import EachBoard from './components/EachBoard';
import SignUp from './components/SignUp';
import MyPage from './components/MyPage';
// import { store } from './reduxFiles/rootReducerAndStore'
// import { connect } from 'react-redux';

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.getBoardNames = this.getBoardNames.bind(this)
//   }

//   getBoardNames() {
//     console.log('app에서 store 상태 조회 : ', store.getState())
//     let boardList = this.props.board
//     let boardNames = []

//     boardList.forEach(board => {
//       boardNames.push(board.boardTitle)      
//     });

//     console.log('app에서 보드리스트 조회 : ', boardList)

//     return boardNames
//   }

//   render() {
//     return (
//       <div className="App">
//         <Route path="/" exact component={Login} />
//         <Route path="/signup" exact component={SignUp} />
//         <Route path="/mypage" exact component={MyPage} />
//         <Route path="/main" exact render={() => <Main board={this.getBoardNames()} />} />
//         <Route path="/main/:boardName" component={EachBoard} />
//       </div>
//     );
//   }  
// }

// const mapStateToProps = state => ({
//   board : state.Add
// })

// export default connect(mapStateToProps)(App);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boardData: [
        {
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
      setInfo: ''
    }

    this.GetBoardTitles = this.GetBoardTitles.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.AddBoard = this.AddBoard.bind(this)
    this.ChangeBoardTitle = this.ChangeBoardTitle.bind(this)
    this.DeleteBoard = this.DeleteBoard.bind(this)
    this.AddList = this.AddList.bind(this)
    this.ChangeListTitle = this.ChangeListTitle.bind(this)
    this.DeleteList = this.DeleteList.bind(this)
    this.AddCard = this.AddCard.bind(this)
    this.ChangeCardDescription = this.ChangeCardDescription.bind(this)
    this.DeleteCard = this.DeleteCard.bind(this)
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
  setInfo(e) {
    this.setState({
      setInfo: e.target.value
    })
    //console.log('SET INFO : ', this.state.setInfo)
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
    let stateToChange = this.state.boardData

    for (let i=0; i<stateToChange.length; i++) {
      if (stateToChange[i].boardTitle === oldTitle) {
        stateToChange[i].boardTitle = this.state.setInfo
        break;
      }
    }
    
    this.setState({
      boardData: stateToChange
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
            }
            return list
          })
        }
        return board
      })
    }))

    console.log('리스트 수정됨... ', this.state.boardData[key])
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
            let list = board.boardContents

            if (list[i].title === listTitle) {
              list.splice(i, 1)
              break
            }
          }
        }
        return board
      })
    }))

    console.log('리스트 삭제됨... ', this.state.boardData[key])
  }

  // 카드 추가
  AddCard() {}

  // 카드 내용 변경
  ChangeCardDescription() {}

  // 카드 삭제
  DeleteCard() {}


  render() {
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
          ChangeBoardTitle={this.ChangeBoardTitle}
          DeleteBoard={this.DeleteBoard}
          AddList={this.AddList}
          ChangeListTitle={this.ChangeListTitle}
          DeleteList={this.DeleteList}
          />
        }
        />

      </div>
    );
  }  
}

export default App;