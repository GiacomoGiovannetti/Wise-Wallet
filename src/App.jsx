import React from 'react';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';

export const App = () => {
  
  //dper muovere le palle devo fare una cosa come per la nav bar basata sul pathname che lo checka e in base a quello assegna la posizione
  return (
    <div>
      <Router>
        <main className={'relative flex flex-col h-auto min-h-screen  bg-oxfordBlue-100 font-raleway text-uranianBlue-100 overflow-hidden'}>
        <NavBar />
        <div className={`absolute w-64 h-64 bg-gunMetal-100 rounded-full blur-2xl -top-8 z-0 md:w-96 md:h-96
                        ${location.pathname === '/' ? '-right-16' : location.pathname === '/registration' ? '-left-16' :'' } `}></div>  
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/registration' element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
          <div className='absolute w-64 h-64 bg-gunMetal-100 rounded-full blur-2xl -left-16 -bottom-20 z-0 md:w-96 md:h-96'></div>
          <Footer/>
        </main>
      </Router>
    </div>
  );
};
