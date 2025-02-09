// import bot from "../assets/bot.jpg"
import Lottie from "lottie-react"
import animationData from "../assets/chatbot.json"

const ChatbotIcon = () => {
    return(
        <div style={{width:50,height:50}}>
            <Lottie animationData={animationData} loop={true}/>
        </div>
       
    )
}

export default ChatbotIcon