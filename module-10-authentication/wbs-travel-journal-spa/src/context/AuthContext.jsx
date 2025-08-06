import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const values = {
    user,
    setUser,
  };

  return <AuthContext value={values}>{children}</AuthContext>;
};

export { AuthContextProvider, AuthContext };
