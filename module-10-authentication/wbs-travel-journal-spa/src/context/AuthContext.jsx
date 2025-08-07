import { createContext, useState, useEffect } from 'react';
import { me } from '@/data/auth';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.log('Invalid token');
      }
    };

    getUser();
  }, []);

  const values = {
    user,
    setUser,
  };

  return <AuthContext value={values}>{children}</AuthContext>;
};

export { AuthContextProvider, AuthContext };
