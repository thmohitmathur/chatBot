import ChatbotIcon from "./chatbotIcon";

const ChatMessage = ({ chat }) => {
  const formatMessage = (text) => {
    // Check if the text already contains an anchor tag to avoid duplicate formatting
    if (text.includes("<a href=")) {
      return text; // Return as is if it already has links formatted
    }

    // Regex to match and format raw URLs (that are NOT inside <a> tags)
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.replace(urlRegex, (match) => {
      return `<a href="${match}" target="_blank" rel="noopener noreferrer" class="chat-link"> Visit here</a>`;
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
