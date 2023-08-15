import React from 'react';
import './App.css';
import { LoginPhone } from '@components/pages';

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-96 rounded-3xl shadow-lg py-8 px-14">
        <LoginPhone />
      </div>
    </div>
  );
}

export default App;
