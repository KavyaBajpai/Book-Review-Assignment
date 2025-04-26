import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/context';
import { toast, ToastContainer } from 'react-toastify';
const Login = () => {
  const [currState, setCurrState] = useState('Login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser, userId, setUserId} = useContext(MainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currState === 'Login') {

    }
    const url = currState === 'Login'
      ? `${import.meta.env.VITE_BACKEND_URL}/api/user/login`
      : `${import.meta.env.VITE_BACKEND_URL}/api/user/register`;

    const bodyData = currState === 'Login'
      ? { email, password }
      : { username, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      console.log(data); 
      if (data.user && data.user.username && data.user.id) {
        setUser(data.user.username);
        setUserId(data.user.id);
        localStorage.setItem('user', data.user.username); 
      localStorage.setItem('userId', data.user.id);
        
      }
      
      
      if (data.token) {
        if(currState === 'Login') {
        toast.success("Login successful!");}
        else
        {
        toast.success("Registration successful!");}
        localStorage.setItem('token', data.token);
        }
        
      }
     catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId && user) {
      console.log("User ID:", userId); 
      console.log("User:", user); 
    }
  }, [userId, user]); 
  

  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 gap-4 text-gray-800">
      <h2 className="text-3xl mb-4 text-white font-semibold">{currState}</h2>

      {currState === 'Sign Up' && (
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
    <ToastContainer />
   </>
  );
};

export default Login;
