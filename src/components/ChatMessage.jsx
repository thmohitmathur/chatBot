import ChatbotIcon from "./chatbotIcon";

const ChatMessage = ({ chat }) => {
  // Function to properly format messages with embedded links on a new line
  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; // Matches URLs

    return text
      .replace(/\[?\s*(https?:\/\/[^\s]+)\s*\]?/g, (match, url) => {
        return `<br><a href="${url}" target="_blank" rel="noopener noreferrer" style="
          color: white;
          background-color: #007bff;
          padding: 4px 8px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
          margin-top: 5px;
        ">🔗 Visit here</a>`;
      });
  };

  return (
    !chat.hideInChat && (
      <div className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}>
        {chat.role === "model" && <ChatbotIcon />}
        <p className="message-text" dangerouslySetInnerHTML={{ __html: formatMessage(chat.text) }}></p>
      </div>
    )
  );
};

export default ChatMessage;
