import React, { useRef, useState } from "react";
import { MessagesList } from "./components/MessagesList";
import { useDispatch, useSelector } from "react-redux";
import { newMessageAction } from "./store/messageReducer";

function App() {

  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.messages);

  
  const [value, setValue] = useState('');
  const [username, setUsername] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        id: Date.now(),
        username
      };
      socket.current.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch(newMessageAction(message));
    };

    socket.current.onclose = () => {
      console.log('socket close');
    };

    socket.current.onerror = () => {
      console.log('socket error');
    };
  }

  function sendMessage(e) {
    e.preventDefault()
    const message = {
      id: Date.now(),
      username,
      text: value,
      event: "message",
      date: new Date().toLocaleTimeString()
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
  }

  if (!connected) {
    return (
      <>
        <div className="app-background"/>
        <div className="wrapper">
          <div className="authorization">
            <input value={username} onChange={e => setUsername(e.target.value)} type="text"/>
            <button onClick={connect}>Sign In</button>  
          </div>  
        </div> 
      </>
    );
  }

  return (
    <>
      <div className="app-background" />
      <div className="wrapper">
        <MessagesList messages={messages}/>
        <div className="form-send">
          <form action="#">
            <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
            <button onClick={sendMessage}>Send</button>
          </form>
          
        </div>
      </div>
    </>
  );
}

export default App;
