import { useState } from 'react';
import ChatWindow from './ChatWindow';
const ChatBtn = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const toggleChatOpen = () => setChatOpen(prev => !prev);

  return (
    <div className='fixed bottom-8 right-8 z-[9999]'>
      <div className='flex flex-col items-end justify-end gap-4'>
        <div className={`${chatOpen ? 'block' : 'hidden'} shadow-lg rounded-lg`}>
          <ChatWindow />
        </div>
        <button onClick={toggleChatOpen} className=' btn btn-primary btn-xl btn-circle'>
          Chat
        </button>
      </div>
    </div>
  );
};

export default ChatBtn;
