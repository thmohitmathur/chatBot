import { useRef } from "react";

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {

    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;
        inputRef.current.value = "";


        //update chathistory with the users message
        setChatHistory((history) => [...history, { role: "user", text: userMessage}]);

          //delay 600ms
          setTimeout(() => {
            setChatHistory((history) => [...history, {role: "model", text: "Thinking..."}]);

            //call the fucntion to genearte bot response
            generateBotResponse([...chatHistory, {role: "user", text: `Using the details provided above, please address this query: ${userMessage}`} ]);    

          },600);
            
            

    };

    return(
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Type Here...." className="message-input" required />
        <button className="material-symbols-rounded"> send </button>
        </form>
    );
}

export default ChatForm