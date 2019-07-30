import React, { Component } from 'react';
import Header from './Header';
import Dialog from './Dialog';
import Input from './Input';
import '../css/main.css';


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
   * 11. TODO - add send message
   * 
   */

  handleSendMessage(message) {
    this.setState((prevState) => {
      prevState.messages.push(message);
      return prevState;
    });
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

  /**
   * 9. TODO - add component resize when component is mounted
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(window);
  }
  /**
   * 10. TODO - remove component resize when component is unmounted
   */
  componentWillUnMount() {
    window.removeEventListener('resize');
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
          <Dialog messages={messages} dialogHeight={dialogHeight} />
          <Input handleSendMessage={this.handleSendMessage} />
        </div>
      </div>
    );
  }
}
