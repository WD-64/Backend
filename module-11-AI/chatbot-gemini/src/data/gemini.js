const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/chat`;

const fetchChat = async (body) => {
  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    // If the response is not ok, throw an error by parsing the JSON response
    const { error } = await response.json();
    throw new Error(error || "Something went wrong");
  }

  return response;
};

const createChat = async (body) => {
  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("AI failed to respond");

  const data = await response.json();

  return data;
};

const getChatHistory = async (chatId) => {
  const response = await fetch(`${baseURL}/${chatId}`);

  if (!response.ok) throw new Error("Failed to fetch chat history");

  const data = await response.json();

  return data;
};

export { createChat, getChatHistory, fetchChat };
