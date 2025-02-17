// App.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state on login/logout
    });

    return () => unsubscribe(); // Clean up the subscription when component unmounts
  }, []);

  return (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header user={user} /> Pass user to Header
        <main className='flex-grow p-4 bg-white pt-16'>
          <Outlet /> {/* Render nested routes like Home, About, etc. */}
        </main>
      </div>
    </div>
  );
}

export default App;
