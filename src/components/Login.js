import React, { useState } from 'react';
import pb, { login } from '../pocketbase/pocketbase';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      
    } catch (error) {
      alert('Login failed');
    }
    
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
