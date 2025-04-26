import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/context';
const Login = () => {
  const [currState, setCurrState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser, userId, setUserId} = useContext(MainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currState === 'Login') {

    }
    const url = currState === 'Login'
      ? 'http://localhost:4000/api/user/login'
      : 'http://localhost:4000/api/user/register';

    const bodyData = currState === 'Login'
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      console.log(data); // show what backend responded
      if (data.user && data.user.username && data.user.id) {
        setUser(data.user.username);
        setUserId(data.user.id);
        localStorage.setItem('user', data.user.username); // Save username to localStorage
      localStorage.setItem('userId', data.user.id);
        //localStorage.setItem('token', data.token); // save token in localStorage
      }
      
      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId && user) {
      console.log("User ID:", userId); // Logs the userId after it is set
      console.log("User:", user); // Logs the username after it is set
    }
  }, [userId, user]); // This will run whenever userId or user is updated
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 gap-4 text-gray-800">
      <h2 className="text-3xl mb-4 text-white font-semibold">{currState}</h2>

      {currState === 'Sign Up' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        required
      />

      <div className="w-full flex justify-end text-sm mt-[-8px]">
        <p
          onClick={() => setCurrState(currState === 'Login' ? 'Sign Up' : 'Login')}
          className="cursor-pointer underline text-white"
        >
          {currState === 'Login' ? 'Create an account' : 'Already have an account?'}
        </p>
      </div>

      <button type="submit" className="bg-gray-800 rounded-lg font-lg text-white font-light px-8 py-2 mt-4">
        {currState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
