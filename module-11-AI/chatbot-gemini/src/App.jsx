import { useState, useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Form from "./components/Form";
import Chat from "./components/Chat";
import { getChatHistory } from "./data/gemini";

function App() {
  // let us reference DOM element for scroll effect
  const chatRef = useRef();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(localStorage.getItem("chatId"));
  console.log(messages);

  // scroll to bottom of chat when new message is added
  useEffect(() => {
    chatRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const getAndSetChatHistory = async () => {
      try {
        const { history } = await getChatHistory(chatId);
        setMessages(history);
      } catch (error) {
        localStorage.removeItem("chatId");
      }
    };

    chatId && getAndSetChatHistory();
  }, []);

  return (
    <div className="h-screen container mx-auto p-5 flex flex-col justify-between gap-5">
      <Chat chatRef={chatRef} messages={messages} />
      <Form
        chatRef={chatRef}
        setMessages={setMessages}
        chatId={chatId}
        setChatId={setChatId}
      />
      <ToastContainer autoClose={1500} theme="colored" />
    </div>
  );
}

export default App;
