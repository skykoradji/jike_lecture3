import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

/**
 * 2. TODO - update the ref to use createRef()
 */
class Dialog extends Component {
  constructor() {
    super();
    this.scrollTarget = React.createRef();
  }
  
  scrollToBottom() {
    const end = ReactDOM.findDOMNode(this.scrollTarget.current);
    end.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { dialogHeight, messages, handleSendMessage } = this.props;
    return (
      <section className="messages-wrapper" style={{ height: `${dialogHeight}px` }}>
        <div className="messages">
          {messages.map((message, i) => (
            <Message key={i} message={message} handleSendMessage={handleSendMessage} />
          ))}
          <div style={{ float: 'left', clear: 'both' }} ref={this.scrollTarget} />
        </div>
      </section>
    );
  }
}
export default Dialog;
