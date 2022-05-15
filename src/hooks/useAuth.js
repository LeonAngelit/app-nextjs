import React, { useState, createContext, useContext } from 'react';
import jsCookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api';
import Router from 'next/router';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const options = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  const signIn = async (email, password) => {
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    console.log(access_token);
    if (access_token) {
      setUser(access_token);
      const token = access_token.access_token;
      jsCookie.set('token', token, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      console.log(user);
      setUser(user);
    }
  };

  const logOut = () => {
    jsCookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    Router.push('/login');
  };

  return {
    user,
    signIn,
    logOut,
  };
}
