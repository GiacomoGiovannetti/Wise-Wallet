import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';

export const App = () => {
  return (
    <div>
      <Router>
        <main className='font-raleway text-uranianBlue-100'>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
};
