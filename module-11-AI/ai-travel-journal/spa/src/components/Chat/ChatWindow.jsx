/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@/context";
import { getChatHistory } from "@/data/gemini";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Chat from "./Chat";
import Form from "./Form";

const ChatWindow = () => {
  const chatRef = useRef();
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [chatId, setChatId] = useState(null);

  // Get the appropriate chat ID based on authentication status
  useEffect(() => {
    if (user) {
      // For authenticated users, use user-specific chat ID
      const userChatId = localStorage.getItem(`user_${user._id}_chatId`);
      setChatId(userChatId);
    } else {
      // For guests, use a generic chat ID
      const guestChatId = localStorage.getItem("guest_chatId");
      setChatId(guestChatId);
    }
  }, [user]);

  useEffect(() => {
    const getAndSetChatHistory = async () => {
      try {
        const { history } = await getChatHistory(chatId);
        setMessages(history);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("chatId");
      }
    };

    chatId && getAndSetChatHistory();
  }, []);

  useEffect(() => {
    chatRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="max-h-[75vh] w-full max-w-[600px] flex flex-col bg-slate-600 rounded-lg">
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
};

export default ChatWindow;
