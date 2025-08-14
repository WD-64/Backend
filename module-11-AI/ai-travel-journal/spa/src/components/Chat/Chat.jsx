import ChatBubble from './ChatBubble';
const Chat = ({ messages, chatRef }) => {
  return (
    <div
      ref={chatRef}
      id='results'
      className='h-2/3 w-full p-8 shadow-md rounded-t-lg overflow-x-hidden overflow-y-auto'
    >
      {messages?.map(msg => {
        return <ChatBubble key={msg._id} message={msg} />;
      })}
    </div>
  );
};

export default Chat;
