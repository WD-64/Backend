import Markdown from 'react-markdown';

const ChatBubble = ({ message }) => {
  const { role, parts } = message;
  return (
    <div className={`chat ${role === 'model' ? 'chat-start' : 'chat-end'}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full p-2 bg-slate-800'>{role === 'model' ? 'Bot' : 'You'}</div>
      </div>
      <div className={`chat-bubble ${role === 'model' ? 'chat-bubble-secondary' : 'chat-bubble-primary'}`}>
        <Markdown>{parts[0].text}</Markdown>
      </div>
    </div>
  );
};

export default ChatBubble;
