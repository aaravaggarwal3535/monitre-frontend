// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header /> {/* Remove user prop */}
        <main className='flex-grow p-4 bg-white pt-16'>
          <Outlet /> {/* Render nested routes like Home, About, etc. */}
        </main>
      </div>
    </div>
  );
}

export default App;
