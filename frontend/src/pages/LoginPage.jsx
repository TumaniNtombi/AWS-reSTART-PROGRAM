import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login, signUp } = useAuth();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setMessage('');

    try {
      if (mode === 'signup') {
        await signUp(email, password);
        setMessage('Sign-up successful. Verify your email in Cognito, then log in.');
        return;
      }
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="center-screen">
      <form className="glass auth-card" onSubmit={submit}>
        <h2>Climate Resilience Command Center</h2>
        <p>Secure access for regional farm operations teams.</p>
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Create account'}</button>
        <button type="button" className="ghost" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          Switch to {mode === 'login' ? 'Sign up' : 'Login'}
        </button>
        {message && <small>{message}</small>}
      </form>
    </main>
  );
}
