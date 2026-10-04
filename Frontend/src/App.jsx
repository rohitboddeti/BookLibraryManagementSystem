import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>
      {!token ? <Auth setToken={setToken} /> : <Dashboard setToken={setToken} />}
    </div>
  );
}