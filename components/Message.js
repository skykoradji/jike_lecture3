import React, { Fragment } from 'react';

const TypingAnimation = () => (
  <div id="wave">
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
  </div>
);

const Richresponse = ({ richResponses, handleSendMessage}) => {
  
  const handleOnClick = (event) => {
    handleSendMessage(event.target.value);
    const elements = document.querySelectorAll('input[type=button]');
    elements.forEach((element) => {
      element.style.display = 'none';
    });
  }

  if(richResponses[0] && richResponses[0].message === 'suggestions') {
    const suggestions = richResponses[0].suggestions.suggestions;
    const buttons = [];
    suggestions.forEach((element, index) => {
      buttons.push(<input type="button"  key={index} style={{ margin: 6 }} onClick={handleOnClick} value={element.title} />);
    });
    return buttons;
  }
  return null;
}
/**
 * 3. TODO - update to use function component
 */

function Message({ message, handleSendMessage }) {
  return (
    <div>
      <div className={`group group-${message.isUser ? 'user' : 'bot'}`}>
        <div className="message" style={{ margin: 0 }}>
          {message.contents.length === 0 ? <TypingAnimation /> : <p>{message.contents}</p>}
        </div>
        { message.richResponses && message.richResponses.length > 0 && 
          <Richresponse richResponses={message.richResponses} handleSendMessage={handleSendMessage} />
        }
      </div>
    </div>
  );
}

export default Message;
