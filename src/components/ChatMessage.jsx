import ChatbotIcon from "./chatbotIcon";

const ChatMessage = ({ chat }) => {
  // Function to format links and buttons properly
  const formatMessage = (text) => {
    // Regex to match URLs, even if they are wrapped in brackets
    const urlRegex = /\[?\s*(https?:\/\/[^\s\]]+)\s*\]?/g;

    // Regex to match button options (e.g., <a href='#' class='chat-option' data-option='...'>...</a>)
    const buttonRegex = /<a href='#' class='chat-option' data-option='(.*?)'>(.*?)<\/a>/g;

    // Format URLs as links
    text = text.replace(urlRegex, (match, url) => {
      // Remove any brackets from the URL
      const cleanUrl = url.replace(/[\[\]]/g, "").trim();
      return `<br><a href="${cleanUrl}" rel="noopener noreferrer" style="
        color: white;
        background-color:rgb(7, 9, 10);
        padding: 4px 8px;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        margin-top: 5px;
        filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));
        
        transition: background-color 0.3s ease;
        " onmouseover="this.style.backgroundColor='#333'" onmouseout="this.style.backgroundColor='#72b3f8'"
      ">🔗 Visit here <br/></a>`;
    });

    // Format buttons with a black background
    text = text.replace(buttonRegex, (match, option, text) => {
      return `<a href="#" class="chat-option" data-option="${option}" style="
        color: white;
        background-color: black;
        padding: 8px 16px;
        border-radius:10px;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        margin: 5px 0;
        border: 1px solid #ccc;
        cursor: pointer;
        transition: background-color 0.3s ease;
      " onmouseover="this.style.backgroundColor='#333'" onmouseout="this.style.backgroundColor='black'">${text}</a>`;
    });

    return text;
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