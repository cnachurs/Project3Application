import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from './firebase'; // Import your register function
import { auth } from './firebase';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        // Call registerWithEmailAndPassword function with user details
        await registerWithEmailAndPassword(name, email, password);
        await auth.currentUser.updateProfile({ displayName: name }); // Set display name in user profile
        navigate('/login'); // Redirect to login after successful registration
      } catch (error) {
        console.error(error);
        // Handle registration error, display error message, etc.
      }
    };

  return (
    <main>
      <section>
        <div>
          <h1>FocusApp</h1>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your Name"
              />
            </div>
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
            <button type="submit">Sign up</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Sign in</Link> now.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;