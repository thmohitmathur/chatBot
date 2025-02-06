import ChatbotIcon from "./chatbotIcon";

const ChatMessage = ({ chat }) => {
  // Function to convert links into clickable elements
  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      part.match(urlRegex) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    !chat.hideInChat && (
      <div className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}>
        {chat.role === "model" && <ChatbotIcon />}
        <p className="message-text">{formatMessage(chat.text)}</p>
      </div>
    )
  );
};

export default ChatMessage;
