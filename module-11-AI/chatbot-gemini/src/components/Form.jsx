import { useState } from 'react';
import { toast } from 'react-toastify';
import { createChat } from '../data/gemini';

const Form = ({ setMessages, chatId }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // If the prompt value is empty, alert the user
      if (!prompt) throw new Error('Please enter a prompt');

      // Disable the submit button
      setLoading(true);

      const userMsg = {
        _id: crypto.randomUUID(),
        role: 'user',
        // message: prompt,
        parts: [{ text: prompt }],
      };

      setMessages((prev) => [...prev, userMsg]);

      const response = await createChat({ message: prompt, chatId });

      const aiMsg = {
        _id: crypto.randomUUID(),
        role: 'model',
        // message: response.aiResponse,
        parts: [{ text: response.aiResponse }],
      };

      setMessages((prev) => [...prev, aiMsg]);
      localStorage.setItem('chatId', response.chatId);
      setPrompt('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-1/3 w-full p-8 bg-slate-600 rounded-lg shadow-md'>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleChange}
          id='prompt'
          rows='5'
          placeholder='Ask me anything...'
          className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        ></textarea>
        <button
          id='submit'
          type='submit'
          className='mt-4 w-full btn btn-primary'
          disabled={loading}
        >
          Submit✨
        </button>
      </form>
    </div>
  );
};

export default Form;
