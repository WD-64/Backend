import { useState, useRef, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import './index.css';
import Form from './components/Form';
import Chat from './components/Chat';
import { getChatHistory } from './data/gemini';

function App() {
  // let us reference DOM element for scroll effect
  const chatRef = useRef();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(localStorage.getItem('chatId'));
  console.log(messages);

  // scroll to bottom of chat when new message is added
  useEffect(() => {
    chatRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  useEffect(() => {
    const setChatHistory = async () => {
      try {
        const response = await getChatHistory(chatId);
        setMessages(response.history);
      } catch (error) {
        console.log(error);
      }
    };

    chatId && setChatHistory();
  }, []);

  return (
    <div className='h-screen container mx-auto p-5 flex flex-col justify-between gap-5'>
      <Chat chatRef={chatRef} messages={messages} />
      <Form chatRef={chatRef} setMessages={setMessages} chatId={chatId} />
      <ToastContainer autoClose={1500} theme='colored' />
    </div>
  );
}

export default App;
