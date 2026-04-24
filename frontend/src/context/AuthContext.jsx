import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getCurrentSession,
  loginUser,
  logoutUser,
  signUpUser,
  persistSession,
  loadPersistedSession
} from '../lib/cognito';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadPersistedSession());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cognitoSession = getCurrentSession();
    if (cognitoSession) {
      const token = cognitoSession.getIdToken().getJwtToken();
      const next = { token, username: cognitoSession.idToken.payload['cognito:username'] };
      setSession(next);
      persistSession(next);
    }
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      async signUp(email, password) {
        return signUpUser(email, password);
      },
      async login(email, password) {
        const cognitoSession = await loginUser(email, password);
        const token = cognitoSession.getIdToken().getJwtToken();
        const next = { token, username: cognitoSession.idToken.payload['cognito:username'] };
        setSession(next);
        persistSession(next);
      },
      logout() {
        logoutUser();
        setSession(null);
      }
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
