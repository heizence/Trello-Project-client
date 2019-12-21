import React from 'react';
import './App.css';
import Login from './components/Login'
import Main from './components/Main';
import EachBoard from './components/EachBoard';
import SignUp from './components/SignUp';
import MyVerticallyCenteredModal from './components/Modals';

function App() {
  return (
    <div className="App">
      <EachBoard />
    </div>
  );
}

export default App;
