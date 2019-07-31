import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Dialog from './Dialog';
import Input from './Input';
import '../static/css/main.css';


export default class ReactBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      messages: [],
      dialogHeight: 300,
      isOpen: props.isOpen !== undefined ? props.isOpen : true,
      isMinimized: props.isMinimized !== undefined ? props.isMinimized : true
    };

    this.handleResize = this.handleResize.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   * 9. TODO - add component resize when component is mounted
   */
  async componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(window);
    await this.getWelcome();
  }
  /**
   * 10. TODO - remove component resize when component is unmounted
   */
  componentWillUnMount() {
    window.removeEventListener('resize');
  }

  async getWelcome() {
    // get welcome event
    const response = await axios.post('/dialogflow/event', { event: 'WELCOME' });
    const { contents, richResponses } = response.data;
    this.appendMessage({ contents, richResponses, isUser: false });
  }

  /**
   * 11. TODO - add send message
   * 
   */
  appendMessage = (message) => {
    this.setState((prevState) => {
      prevState.messages.push(message);
      return prevState;
    });
  }

  async handleSendMessage(message) {
    // customer send message
    this.appendMessage({ contents: [ message ], isUser: true });
    // response message from server
    const response = await axios.post('/dialogflow/query', { message });
    const { contents, richResponses } = response.data;
    this.appendMessage({ contents, richResponses, isUser: false});
  }

  handleResize(e) {
    const window = e.target || e;
    const y = window.innerHeight;
    const header = document.querySelector('.container header');
    const input = document.querySelector('.container .text-form');
    let dialogHeight = y - header.offsetHeight - input.offsetHeight;
    if (dialogHeight < 0 || !dialogHeight) {
      dialogHeight = 0;
    } else if (this.props.dialogHeightMax && dialogHeight > this.props.dialogHeightMax) {
      dialogHeight = this.props.dialogHeightMax;
    }
    this.setState({ dialogHeight });
  }

  handleToggle() {
    if (this.state.isMinimized) {
      this.setState({ isOpen: !this.state.isOpen });
    } else {
      this.setState({ isMinimized: true });
    }
  }

  render() {
    const { isMinimized, title, isOpen, dialogHeight, messages } = this.state;
    return (
      <div
        className="container"
        style={isMinimized ? { display: 'block' } : { display: 'none' }}
      >
        <Header title={title} onClick={this.handleToggle} />
        <div
          style={ isOpen
              ? { minHeight: `${dialogHeight}px` }
              : { maxHeight: 0, overflow: 'hidden' }
          }
        >
          <Dialog messages={messages} dialogHeight={dialogHeight} handleSendMessage={this.handleSendMessage} />
          <Input handleSendMessage={this.handleSendMessage} />
        </div>
      </div>
    );
  }
}
