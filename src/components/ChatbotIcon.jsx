// import bot from "../assets/bot.jpg"
import Lottie from "lottie-react"
import animationData from "../assets/chatbot.json"

const ChatbotIcon = ({ size = 50 }) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ width: size, height: size }} // Ensures proper scaling
    />
  );
};

export default ChatbotIcon;
