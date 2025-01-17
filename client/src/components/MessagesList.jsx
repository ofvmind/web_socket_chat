import { MessageItem } from "./MessageItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const MessagesList = ({messages}) => {
  return (
    <div className="chat">
      <TransitionGroup>
        {messages.map(message => 
          <CSSTransition
             key={message.id}
             timeout={500}
             classNames="message"
          >
             <MessageItem message={message} />
          </CSSTransition>
         
        )}
      </TransitionGroup>
      
    </div>
  );
};