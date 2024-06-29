import React, { useState } from 'react';
import {addUser} from '../pocketbase/pocketbase';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const handleSignup = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(false);
  
      try {
        await addUser(email, password);

        setSuccess(true);
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div className="login">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-Mail" 
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password" 
            />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>User registered successfully!</p>}
      </div>
    );
  };
  
  export default Signup;
