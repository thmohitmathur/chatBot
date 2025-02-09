import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/chatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { renInfo } from "./renInfo";

const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: renInfo,
    },
    {
      role: "model",
      text: "Hello! I'm reNNa, your guide to the Renaissance event. What would you like to know more about? <br> 1. <a href='#' class='chat-option' data-option='About Renaissance'>About Renaissance</a> <br> 2. <a href='#' class='chat-option' data-option='About Events'>About Events</a> <br> 3. <a href='#' class='chat-option' data-option='Help'>Help</a>",
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const chatBodyRef = useRef();

  // Function to handle chatbot toggler click
  const handleTogglerClick = () => {
    setShowChatbot((prev) => !prev);
    setShowNotification(false);
  };

  // Function to handle button clicks
  const handleButtonClick = (option) => {
    // Add the user's selection to the chat history
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: option },
    ]);

    // Simulate the bot's response after a short delay
    setTimeout(() => {
      let botResponse = "";
      switch (option) {
        case "About Renaissance":
          botResponse = "Renaissance is the National Techno-Cultural Fest of JECRC College, featuring a blend of technical and cultural events that showcase talent and innovation. Would you like to know more about specific events?";
          break;
        case "About Events":
          botResponse = "Here are the events you can learn more about: <br> 1. <a href='#' class='chat-option' data-option='Cultural Events'>Cultural Events</a> <br> 2. <a href='#' class='chat-option' data-option='Technical Events'>Technical Events</a> <br> 3. <a href='#' class='chat-option' data-option='Splash Events'>Splash Events</a>";
          break;
        case "Help":
          botResponse = "If you need further assistance, feel free to contact us at: +91 98765 43210";
          break;
        default:
          botResponse = "I'm sorry, I didn't understand that. Could you please clarify?";
      }

      // Add the bot's response to the chat history
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: botResponse },
      ]);
    }, 600); // 600ms delay to simulate thinking
  };

  // Add event listeners for button clicks
  useEffect(() => {
    const handleOptionClick = (event) => {
      const option = event.target.getAttribute("data-option");
      if (option) {
        handleButtonClick(option);
      }
    };

    // Attach event listeners to all buttons with the class 'chat-option'
    const buttons = document.querySelectorAll(".chat-option");
    buttons.forEach((button) => {
      button.addEventListener("click", handleOptionClick);
    });

    // Cleanup event listeners on component unmount
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleOptionClick);
      });
    };
  }, [chatHistory]); // Re-attach listeners when chat history changes

  const generateBotResponse = async (history) => {
    // Format chat history for API request
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      // Make the call to get the bot's response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong");

      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    // Auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      {/* Notification Prompt */}
      {showNotification && (
        <div className="chatbot-notification">
          <p>How can I help you? Let's chat!</p>
          <button onClick={handleTogglerClick} className="close-notification"></button>
        </div>
      )}

      {/* Chatbot Toggler Button */}
      <button onClick={handleTogglerClick} id="chatbot-toggler">
        <ChatbotIcon />
      </button>

      {/* Chatbot Popup */}
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">ReNNa Bot</h2>
          </div>
          <button onClick={handleTogglerClick} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey There! <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  );
};

export default App;