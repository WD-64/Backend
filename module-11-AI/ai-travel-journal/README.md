# Travel Journal AI Integration

So far you've looked at how to make a simple chatbot using Gemini's SDK. But for something like this, user's could simply go to Gemini's homepage. We want to integrate Generative AI into a larger application, and offer personal results to signed in users.

## Instructions

### Integrate AI Simple Server into the Travel Journal API

To do this, you will need copy the needed files, and update import paths accordingly. Namely you will need:

- `chat` controllers
- `Chat` Mongoose model
- `chatRouter` (and import it for use in `index.js`)
- `userMessage` Zod schema
- add `GEMINI_API_KEY` to `.env` file

Once you have copied over the necessary files, run the development server, and test the endpoints in Postman to confirm they are working

### Integrate Chatbot UI and features into Travel Journal SPA

- Copy your `/data/gemini.js` file into the `/data` folder
  - Make sure to import and re-export from `index.js`
- Create a new `Chat` folder inside of `/components`
- Inside of `/components/Chat` create a new `ChatBtn` component that looks like this:

```js
import { useState } from 'react';
const ChatBtn = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const toggleChatOpen = () => setChatOpen(prev => !prev);

  return (
    <div className='fixed bottom-8 right-8 z-[9999]'>
      <div className='flex flex-col items-end justify-end gap-4'>
        <div className={`${chatOpen ? 'block' : 'hidden'} shadow-lg rounded-lg`}>ChatWindow</div>
        <button onClick={toggleChatOpen} className=' btn btn-primary btn-xl btn-circle'>
          Chat
        </button>
      </div>
    </div>
  );
};

export default ChatBtn;
```

By adding `className='fixed bottom-8 right-8 z-[9999]'` we pin this icon to the bottom right corner. Setting the `z-index` to `9999` ensures that it will layer on top of any other piece of UI.

- import and re-export `ChatBtn` from `components/index.js`
- import it to `RootLayout`, and render it underneath `Outlet`

```js
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Navbar, ChatBtn } from '@/components';
import { AuthContextProvider } from '@/context';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <div className='container mx-auto'>
        <ToastContainer position='bottom-left' autoClose={1500} theme='colored' />
        <Navbar />
        <Outlet />
        <ChatBtn />
      </div>
    </AuthContextProvider>
  );
};

export default RootLayout;
```

Now you should see a chat icon in the bottom right corner, and clicking on it will toggle view of the `ChatWindow` text

- continue migrating the rest of the components from the Chatbot
  - when you migrate `App.jsx`, rename `App` to `ChatWindow` and add it to a `ChatWindow.jsx` component
  - Make sure to update import paths as you migrate
- import the `ChatWindow` component into `ChatBtn.jsx` and render it instead of the `ChatWindow` text
- Now when you toggle `chatOpen` you should see that chat window. Test the chat, and confirm everything is working

- Adjust the styles so that the `ChatWindow` looks better in it's new environment (doesn't have to be perfect)

### Update the system instructions

Now that we have a specific use case for our AI assistant, we want the system instructions to reflect that. Give instructions so that the AI assistant will:

- talk with an appropriate tone-of-voice
- only talk about travel
- be safe against user attempts to change, read, or update instructions
- admit to not knowing something, rather than hallucinate
- recommend users sign in for more personalized results if they are not signed it

For help with how to achieve this checkout the official guides on:

- [Prompt Design](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design)
  - [Context](https://cloud.google.com/vertex-ai/generative-ai/docs/chat/chat-prompts#context)
- [System Instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instruction-introduction)

Test your AI assistant by trying to ask it off-topic questions, or get it to ignore pervious instructions. If you're able to jailbreak it (get it to perform outside of the system instructions), adjust instructions until it behaves as desired

### Creating a personalized chat

Now that the AI is behaving as a travel assistant for logged out users, we want logged in users to get more personalized results based on their posts. For this, we will need to find all posts from the logged in user, and add them as context to the end of the system instructions

- inside of `controllers/chats.js` make a new function called `createPersonalChat`, and copy the contents of `createChat` to use as a starting point. then export the function
- import this new controller in `routes/chatRouter.js` and create a new endpoint that is:
  - a `POST` requests
  - to `/chat/personal`
  - uses `validateZod` middleware to validate the request body
- test the endpoint to verify it behaves exactly like the `POST` `/chat` endpoint

Since this chat will be personalized for logged in users, we also want to add the `verifyToken` middleware. Import it, and add it to the endpoint. Your endpoint should look something like this:

```js
chatRouter.post('/personal', verifyToken, validateZod(userMessageSchema), createPersonalChat);
```

- back in `/controllers/chats.js` destructure the `userId` from the request
- import the `Post` model, and use it to query all Posts from this user. You can use the `.select()` method to only include the `title` and `content` of each post, since this is what Gemini needs for the personalized results. Since this is a read-only query, you can also use the `lean()` method

- inside of `at.chats.create()`, add the stringified `userPosts` to the end of the `systemInstruction`, to provide it as context
  - since `systemInstruction` is just a string, you can add to it by concatenating or using a template literal

Test your endpoint. It should now only work for logged in users, and use their posts to recommend their next travel destinations! Make sure the logged in user has at least a couple of posts (you can use Gemini to write these for you 😜). Check that the AI is behaving as intended, and tweak your system instruction if needed to improve the behaviour.

### Personalizing results in our SPA

Now that our endpoint is set up and working, we need to create a function in our SPA to hit that endpoint. This means we'll need a new

- `fetchPersonalChat` function for use with streaming, and to be called in...
- `createPersonalChat`, for use when streaming is not selected

- Create these two new functions (they will look very similar to `fetchChat` and `createChat`)

  - make sure to `fetch` to the `chat/personal` endpoint
  - make sure to include credentials now that we are working with cookies
  - import these functions into `index.js` and re-export them

- in `/components/Chat/Form.jsx` import these 2 new functions, and also import `useAuth`

- destructure `isAuthenticated` from `useAuth()`

- inside your submit handler, conditionally fetch `chat` or `personalChat` based on if `isAuthenticated` is `true` or `false` for both streaming and non-streaming options
  - hint: you can set the value of a variable conditionally with a ternary operator like so: `const res = isAuthenticated ? function1() : function2()`

As always, test your application to verify everything is working. Users should be able to continue a chat they started logged out after logging in. Once any bugs or syntax errors are taken care of, you have an AI assistant that gives personalized results!
