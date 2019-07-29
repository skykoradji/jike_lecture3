import React, { Component } from 'react';

const Bubble = (text) => (
  <div className="message" style={{ margin: 0 }}>
    {text === null ? <TypingAnimation /> : <p>{text}</p>}
  </div>
);

const TypingAnimation = () => (
  <div id="wave">
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
  </div>
);

/**
 * 3. TODO - update to use function component
 */
class Message extends Component {
  
  render() {
    const { messages, isUser } = this.props;

    return (
      <div className={`group group-${isUser ? 'user' : 'bot'}`}>
        { messages.map((text, i) => (
          <Bubble key={i} text={text} />
        ))}
      </div>
    );
  }
}

export default Message;
