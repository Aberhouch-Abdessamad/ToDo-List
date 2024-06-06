import React from 'react';
import Store from './pages/Store';
import Tasks from './pages/Tasks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/Store" element={<Store />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
