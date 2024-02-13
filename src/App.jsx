import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';

export const App = () => {
  //usa uselocation per cambiare posizione palle a seconda della pagina, facendo una condizione basata sul location.pathname
  return (
    <div>
      <Router>
        <main className='relative flex flex-col h-auto min-h-screen  bg-oxfordBlue-100 font-raleway text-uranianBlue-100 overflow-hidden'>
        <NavBar />
        <div className='absolute w-64 h-64 bg-gunMetal-100 rounded-full blur-2xl -right-16 -top-8 z-0 md:w-96 md:h-96'></div>  
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
          </Routes>
          <div className='absolute w-64 h-64 bg-gunMetal-100 rounded-full blur-2xl -left-16 -bottom-20 z-0 md:w-96 md:h-96'></div>
          <Footer/>
        </main>
      </Router>
    </div>
  );
};
