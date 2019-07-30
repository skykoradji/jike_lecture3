import React, { Component } from 'react';

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

function Message({ message, isUser }) {
  return (
    <div className={`group group-${isUser ? 'user' : 'bot'}`}>
      <div className="message" style={{ margin: 0 }}>
        {message === null ? <TypingAnimation /> : <p>{message}</p>}
      </div>
    </div>
  );
}

export default Message;
