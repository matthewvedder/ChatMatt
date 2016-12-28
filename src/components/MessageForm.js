import React, { Component } from 'react'
import Input from './common/Input'
import io from 'socket.io-client'
const socket = io('http://localhost:3001')

class MessageForm extends Component {

  constructor (props) {
    super(props)
    this.state = { value: '', messages: [], notifications: [], isTyping: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    socket.on('typing status to client', (isTyping) => {
      this.setState({ isTyping: isTyping })
    })
    socket.on('notifications', (notifications) => {
      this.setState({ notifications: [...this.state.notifications, notifications] })
    })
    socket.on('message to client', (msg) => {
      this.setState({ messages: [...this.state.messages, msg] })
    })
  }

  handleChange (event) {
    const { value } = event.target
    this.setState({ value: value })
    this.sendTypingStatus(value)
  }

  handleSubmit (event) {
    const { value } = this.state
    socket.emit('message to server', value)
    socket.emit('typing status to server', false)
    this.setState({ value: '' })
    event.preventDefault()
  }

  mapList (array) {
    return (
      array.map((message, i) => {
        return <p key={i}>{message}</p>
      })
    )
  }

  isTypingMessage () {
    return (this.state.isTyping) ? 'A user is typing...' : ''
  }

  sendTypingStatus (value) {
    if (value.length > 0) {
      socket.emit('typing status to server', true)
    } else {
      socket.emit('typing status to server', false)
    }
  }

  render () {
    const { value, messages, notifications } = this.state
    const { notificationsStyle, typingStyle, inputContainerStyle, buttonStyle } = styles
    return (
      <div>
        <ul style={ notificationsStyle }>
          { this.mapList(notifications) }
        </ul>

        <ul id="messages">{ this.mapList(messages) }</ul>

        <form style={inputContainerStyle} onSubmit={ this.handleSubmit }>
          <Input
            value={ value }
            id="message"
            onChange={ this.handleChange }
          />
          <button style={ buttonStyle }>Send</button>
        </form>

        <p style={ typingStyle }>
          { this.isTypingMessage() }
        </p>
      </div>
    )
  }
}

const styles = {
  inputContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '10'
  },
  notificationsStyle: {
    color: 'orange'
  },
  typingStyle: {
    color: 'green'
  },
  buttonStyle: {
    color: 'white',
    backgroundColor: '#222',
    border: 0
  }
}

export default MessageForm
