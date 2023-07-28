import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthState } from '../context/AuthProvider';
import { Notify } from '../utils';

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = AuthState();

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If any field is missing
    if (!credentials.email || !credentials.password) {
      setIsLoading(false);
      return Notify('Please Fill all the Fields', 'warn');
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('auth', JSON.stringify(data)); // Save auth details in local storage
        setAuth(data);
        setIsLoading(false);
        navigate('/'); // Go to home page
        return Notify('You are successfully logged in', 'success');
      } else {
        setIsLoading(false);
        return Notify(data.error, 'warn');
      }
    } catch (error) {
      setIsLoading(false);
      return Notify('Internal server error', 'error');
    }
  };

  return (
    <form className="auth__form p-4 mx-auto max-w-md border rounded shadow-lg" onSubmit={loginHandler}>
      <h3 className="text-center text-xl mb-5">Login to Your Account</h3>
      <div className="mb-3">
        <label htmlFor="email" className="block mb-1">Email address</label>
        <input
          type="email"
          name="email"
          tabIndex="1"
          placeholder="Enter email"
          value={credentials.email}
          onChange={(e) => handleCredentials(e)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          tabIndex="2"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        tabIndex="3"
        className={`w-full p-2 bg-blue-500 rounded text-white ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Login'}
      </button>

      <div className="mt-3 text-center">
        <span>
          Don't have an account?&nbsp;
          <Link to="/register" tabIndex="4" className="text-blue-500 hover:underline">
            Register now
          </Link>
        </span>
      </div>
    </form>
  );
};

export default Login;
