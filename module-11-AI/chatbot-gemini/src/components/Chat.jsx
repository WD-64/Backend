import ChatBubble from './ChatBubble';
const Chat = ({ messages, chatRef }) => {
  return (
    <div
      ref={chatRef}
      id='results'
      className='h-2/3 w-full p-8 bg-slate-600 rounded-lg shadow-md overflow-y-auto'
    >
      {messages?.map((msg) => {
        return <ChatBubble key={msg._id} content={msg} />;
      })}
    </div>
  );
};

export default Chat;
