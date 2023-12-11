import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logInWithEmailAndPassword } from './firebase'; // Import your login function

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call logInWithEmailAndPassword function with user credentials
      await logInWithEmailAndPassword(email, password);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error(error);
      // Handle login error, display error message, etc.
    }
  };

  return (
    <main>
      <section>
        <div>
          <h1>FocusApp</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                type="email"
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link> now.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;