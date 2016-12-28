import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import MessageForm from './components/MessageForm'

class App extends Component {
  render () {
    return (
      <div className="App" style={ styles.App }>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Chat By Matt. Welcome!</h2>
        </div>
        <MessageForm style={ styles.MessageForm }/>
      </div>
    )
  }
}

const styles = {
  App: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  MessageForm: {
    display: 'fixed',
    position: 'bottom'
  }
}

export default App
