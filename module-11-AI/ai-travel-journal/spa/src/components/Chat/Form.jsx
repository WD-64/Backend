import { useAuth } from "@/context";
import {
  createChat,
  createPersonalChat,
  fetchChat,
  fetchPersonalChat,
} from "@/data";
import { useState } from "react";
import { toast } from "react-toastify";

const Form = ({ setMessages, chatId, setChatId }) => {
  const { isAuthenticated } = useAuth();
  const [isStream, setIsStream] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChecked = () => setIsStream((prev) => !prev);
  const handleChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // If the prompt value is empty, alert the user
      if (!prompt) throw new Error("Please enter a prompt");

      // Disable the submit button
      setLoading(true);

      const userMsg = {
        _id: crypto.randomUUID(),
        role: "user",
        parts: [{ text: prompt }],
      };
      setMessages((prev) => [...prev, userMsg]);

      const asstMsg = {
        _id: crypto.randomUUID(),
        parts: [{ text: "" }],
        role: "model",
      };

      if (isStream) {
        const res = isAuthenticated
          ? await fetchPersonalChat({
              message: prompt,
              stream: isStream,
              chatId,
            })
          : await fetchChat({ message: prompt, stream: isStream, chatId });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let responseText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          const lines = chunk.split("\n");
          // console.log(lines);

          lines.forEach((line) => {
            if (line.startsWith("data: ")) {
              const jsonStr = line.replace("data: ", "");
              // console.log(jsonStr);
              const data = JSON.parse(jsonStr);
              // console.log(data);

              if (data.chatId) {
                localStorage.setItem("chatId", data.chatId);
                setChatId(data.chatId);
              } else if (data.text) {
                const { text } = data;
                console.log(text);
                responseText += text;
                setMessages((prev) => {
                  const msgExists = prev.some((msg) => msg._id === asstMsg._id);
                  // console.log('prev', prev);
                  if (!msgExists) {
                    asstMsg.parts[0] = { text: responseText };
                    return [...prev, asstMsg];
                  } else {
                    return prev.map((msg) => {
                      if (msg._id === asstMsg._id) {
                        // console.log('parts text: ', msg.parts[0].text);
                        msg.parts[0].text = responseText;
                      }
                      return msg;
                    });
                  }
                });
              }
            }
          });
        }
      } else {
        const response = isAuthenticated
          ? await createPersonalChat({
              message: prompt,
              chatId,
              stream: isStream,
            })
          : await createChat({ message: prompt, chatId, stream: isStream });
        asstMsg.parts[0].text = response.aiResponse;
        setMessages((prev) => [...prev, asstMsg]);
        localStorage.setItem("chatId", response.chatId);
        setChatId(chatId);
      }
      setPrompt("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8 bg-slate-600 border-t-2 shadow-md rounded-b-lg">
      <form onSubmit={handleSubmit}>
        <label className="flex gap-2 items-center my-2">
          <input
            id="stream"
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={isStream}
            onChange={toggleChecked}
            disabled={loading}
          />
          <span>Stream response?</span>
        </label>
        <input
          value={prompt}
          onChange={handleChange}
          id="prompt"
          placeholder="Ask me about your next holiday..."
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          id="submit"
          type="submit"
          className="mt-4 w-full btn btn-primary"
          disabled={loading}
        >
          Send ✨
        </button>
      </form>
    </div>
  );
};

export default Form;
