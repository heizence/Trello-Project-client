import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login'
import Main from './components/Main';
import EachBoard from './components/EachBoard';
import SignUp from './components/SignUp';
import MyPage from './components/MyPage';

function App() {
  const boardList1 = ['a1', 'a2', 'a3', 'a4', 'a5']
  const boardList2 = ['b1', 'b2', 'b3', 'b4', 'b5']
  const boardList3 = ['c1', 'c2', 'c3', 'c4', 'c5']

  return (
    <div className="App">
      <Route path="/main" exact render={() => <Main boardData={boardList1}/>} />
      <Route path="/main/:boardName" component={EachBoard} />
    </div>
  );
}

export default App;
