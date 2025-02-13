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
    setShowNotification(false); // Hide notification when chatbot is opened
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
          botResponse = "Here are the events you can learn more about: <br> 1. <a href='#' class='chat-option' data-option='Cultural Events'>Cultural Events</a> <br> 2. <a href='#' class='chat-option' data-option='Splash Events'>Splash Events</a> <br> 3. <a href='#' class='chat-option' data-option='Technical Events'>Technical Events</a>";
          break;
        case "Cultural Events":
          botResponse = "Cultural Events are a way to showcase your abilities in front of a crowd and win prizes. Here are some of the cultural events: <br> 1. Inaugural Ceremony <br> 2. Sarega (Prelims) <br> 3. Sarega (Finals) <br> 4. Masterchef Challenge <br> 5. RapZap Prelims <br> 6. Rockathon <br> 7. RapZap <br> 8. DJ War <br> 9. Guest DJ <br> 10. Beat The Beats <br> 11. Footloose <br> 12. Hunar <br> 13. Battle Mania <br> 14. Adaa <br> 15. Guest Band <br> 16. Navras <br> 17. Kavya <br> 18. Shor Bazzar <br> 19. Bootstrapping <br> 20. Celebrity Night";
          break;
        case "Splash Events":
          botResponse = "Splash Events are the events in which you can play games and win prizes. Here are some of the splash events: <br> 1. Gully Cricket <br> 2. Half Court Basketball (3V3) <br> 3. Beg Borrow Steal <br> 4. Treasure Hunt <br> 5. Lan Gaming <br> 6. IPL Auction <br> 7. Sac Race <br> 8. Game of Cinema <br> 9. Relay Race <br> 10. Tug of War <br> 11. Arm Wrestling <br> 12. Chess <br> 13. 3 Leg Race";
          break;
        case "Technical Events":
          botResponse = "Technical Events are the events in which you can showcase your technical skills and win prizes. Here are some of the technical events: <br> \
          1. Blink It <br> \
          2. Hardware Bites <br> \
          3. Formula Zero <br> \
          4. Tech Probe <br> \
          5. Dexterity <br> \
          6. 3D Mania <br> \
          7. Campus Kart Clash <br> \
          8. RapZap Prelims <br> \
          9. Knowledge Knockout <br> \
          10. Bits (Coding Contest) <br> \
          11. Rockathon <br> \
          12. Card Darshan <br> \
          13. Web3 Idea-thon & Build-a-thon <br> \
          14. Code Zeal <br> \
          15. Tech Hunt <br> \
          16. Brain Quest <br> \
          17. Robo Soccer <br> \
          18. Programmer's Playground <br> \
          19. Technical Poster Making Competition <br> \
          20. Appie <br> \
          21. Puzzle Mania <br> \
          22. JECRC Technoads <br> \
          23. Pro-Lets <br> \
          24. Technocrazy <br> \
          25. Best Out Of Waste <br> \
          26. Resin O'clock <br> \
          27. Web Bro <br> \
          28. Game of Drones <br> \
          29. Situational Que <br> \
          30. Crypto Mining <br> \
          31. Subito <br> \
          32. Robo Tug of War <br> \
          33. Electroquizzer <br> \
          34. Tech Spectrum <br> \
          35. Virtual Vision <br> \
          36. Flick (Short Film) <br>";
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

  // Add a timeout to hide the notification after 4 seconds
  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setShowNotification(false);
    }, 10000); // 10 seconds

    // Cleanup the timeout on component unmount
    return () => clearTimeout(notificationTimeout);
  }, []); // Run only once on component mount

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
        <ChatbotIcon size={80} />
      </button>

      {/* Chatbot Popup */}
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon size={50} />
            <h2 className="logo-text">RENA</h2>
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