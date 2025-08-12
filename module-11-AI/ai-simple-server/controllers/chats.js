import { GoogleGenAI } from '@google/genai';
import { isValidObjectId } from 'mongoose';
import Chat from '../models/Chat.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const model = 'gemini-2.0-flash';
const systemInstruction = 'You are Gollum after becoming a senior web developer';

const createSimpleChat = async (req, res) => {
  const { message } = req.sanitizedBody;

  let history = [
    {
      role: 'user',
      parts: [{ text: 'Hello' }]
    },
    {
      role: 'model',
      parts: [{ text: 'Great to meet you. What would you like to know?' }]
    }
  ];

  const chat = ai.chats.create({
    model,
    history,
    config: {
      systemInstruction
    }
  });

  const aiResponse = await chat.sendMessage({ message });

  history = chat.getHistory();

  res.json({ aiResponse: aiResponse.text });
};

const createChat = async (req, res) => {
  const { message, chatId } = req.sanitizedBody;

  // find chat in database
  let currentChat = await Chat.findById(chatId);
  // if no chat is found, create a chat
  if (!currentChat) {
    currentChat = await Chat.create({});
  }
  // add user message to database history
  currentChat.history.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const chat = ai.chats.create({
    model,
    // stringifying and then parsing is like using .lean(). It will turn currentChat into a plain JavaScript Object
    // We don't use .lean(), because we later need to .save()
    history: JSON.parse(JSON.stringify(currentChat.history)),
    config: {
      systemInstruction
    }
  });
  const aiResponse = await chat.sendMessage({ message });

  // add AI message to database history
  currentChat.history.push({
    role: 'model',
    parts: [{ text: aiResponse.text }]
  });

  await currentChat.save();

  res.json({ aiResponse: aiResponse.text, chatId: currentChat._id });
};

const getChatHistory = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const chat = await Chat.findById(id);

  if (!chat) throw new Error('Chat not found', { cause: 404 });

  res.json(chat);
};

export { createSimpleChat, createChat, getChatHistory };
