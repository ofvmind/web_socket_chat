export const MessageItem = ({ message }) => {
  return (
    <>
      {message.event === "message" ? (
        <div className="message">
          <p><strong>{message.username}</strong>. {message.text}</p>
          <p className="time">{message.date}</p>
        </div>
      ) : message.event === "connection" ? (
        <div className="connect">User {message.username} connected</div>
      ) : (
        <div className="disconnect">User {message.username} disconnected</div>
      )}
    </>
  );
};
