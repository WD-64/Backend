# A simple server for working with Gemini API

This project provides a simple server for Gemini API requests, allowing you to manage API requests and responses, and get the chat history.

## Installation

- Fork and Clone this project

- Install dependencies:

```bash
npm install
```

### Get a Gemini API Key

- Follow this link to get your API key: https://aistudio.google.com/app/apikey
- If a modal pops up, click `Get API key`
- In the dashboard, click `Create API Key` in the top right corner
- Click `Create API key in new project` if this is your first time working with Gemini
  - choose an existing project if re-generating an API key

### Continue project Setup

- Create `.env` file at the root of the project with a variable `GEMINI_API_KEY` with the value of your Gemini secret key
- Add a second variable `MONGO_URI` and set it to your MongoDB Connection string
- Run

```bash
npm run dev
```

## Endpoints

Currently, this API supports

- Simple Chat: `POST` `/chat/simple`
  - A basic implementation, holds the chat history in memory
- Chat: `POST` `/chat`
  - Chat history is stored in a MongoDB database
- Get Chat HistoryL `GET` `/chat/:id`
  - Get full chat history from database

## Sample request

### Simple Chat and Chat Body

```json
{
  "message": "How do I save to local storage?",
  "chatId": "6849725aa34cc4996b4ea6ee" // not available on simple chat, optional on chat
}
```

## Server setup checklist

### `POST` `/chat/simple`

- Make a request to this endpoint
- Look at the `createSimpleChat` function in `controllers/chats.js`
- Update the `systemInstruction` to change the "voice" of the AI assistant
- Note the structure of the `history` variable
  - Update the history to see how it influences the AI assistant
- Note the `getHistory()` method

### `POST` `/chat`

- Make a request to this endpoint
- Note the shape of the `Chat` model found in `/models/Chat.js`
- Compare the flow to the `createSimpleChat` controller. What has been added/changed to allow database storage?
- Create a chat, and include the `chatId` in the body of subsequent requests
- Open Mongo Compass, and see what gets stored when you save a chat
- Make note of the additional comments

### `GET` `/chat/:id`

- Make a request to this endpoint, and take note of the structure of the body
- Look closely at how the objects in the `history` are structured.

#### Use any extra time to play around with the API, and to read through the [Gemini Documentation](https://ai.google.dev/gemini-api/docs/text-generation)
