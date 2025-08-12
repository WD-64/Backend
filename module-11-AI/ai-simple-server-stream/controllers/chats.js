import { GoogleGenAI } from '@google/genai';
import { isValidObjectId } from 'mongoose';
import Chat from '../models/Chat.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const model = 'gemini-2.0-flash';
const systemInstruction =
  'You are Gollum after becoming a senior web developer';

const createSimpleChat = async (req, res) => {
  const { message } = req.sanitizedBody;

  let history = [
    {
      role: 'user',
      parts: [{ text: 'Hello' }],
    },
    {
      role: 'model',
      parts: [{ text: 'Great to meet you. What would you like to know?' }],
    },
  ];

  const chat = ai.chats.create({
    model,
    history,
    config: {
      systemInstruction,
    },
  });

  const aiResponse = await chat.sendMessage({ message });

  history = chat.getHistory();

  res.json({ aiResponse: aiResponse.text });
};

const createChat = async (req, res) => {
  const { message, chatId, stream } = req.sanitizedBody;

  // find chat in database
  let currentChat = await Chat.findById(chatId);
  // if no chat is found, create a chat
  if (!currentChat) {
    currentChat = await Chat.create({});
  }
  // add user message to database history
  currentChat.history.push({
    role: 'user',
    parts: [{ text: message }],
  });

  const chat = ai.chats.create({
    model,
    // stringifying and then parsing is like using .lean(). It will turn currentChat into a plain JavaScript Object
    // We don't use .lean(), because we later need to .save()
    history: JSON.parse(JSON.stringify(currentChat.history)),
    config: {
      systemInstruction,
    },
  });

  if (stream) {
    //process stream
    const response = await chat.sendMessageStream({ message });

    res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    });

    let fullResponse = '';
    for await (const chunk of response) {
      const textChunk = `data: ${JSON.stringify({ text: chunk.text })}\n\n`;

      res.write(textChunk);

      fullResponse += chunk.text;
    }

    const chatIdChunk = `data: ${JSON.stringify({
      chatId: currentChat._id,
    })}\n\n`;

    res.write(chatIdChunk);

    //Save it in the DB
    currentChat.history.push({
      role: 'model',
      parts: [{ text: fullResponse }],
    });

    res.end();

    //Once the connection is ended, either intentionally (because we've sent all of the data)
    // OR accidentally (use navigated away from the page midstream, or the connection was interrupted) we want to handle that
    res.on('close', async () => {
      await currentChat.save();
      res.end(); //Make sure the connection closes
    });
  } else {
    const aiResponse = await chat.sendMessage({ message });

    // add AI message to database history
    currentChat.history.push({
      role: 'model',
      parts: [{ text: aiResponse.text }],
    });

    await currentChat.save();

    res.json({ aiResponse: aiResponse.text, chatId: currentChat._id });
  }
};

const getChatHistory = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const chat = await Chat.findById(id);

  if (!chat) throw new Error('Chat not found', { cause: 404 });

  res.json(chat);
};

export { createSimpleChat, createChat, getChatHistory };
