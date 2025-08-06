const API_URL = import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL;
if (!API_URL)
  throw new Error('API URL is required, are you missing a .env file?');
const baseURL = `${API_URL}/auth`; //http://localhost:8000/auth

//This function only takes care of sending a POST request
export const signUp = async (formData) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error('Error while signing up!');
};

export const signIn = async (formData) => {
  const res = await fetch(`${baseURL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error('Error while signing in!');

  const data = await res.json();
  return data;
};
