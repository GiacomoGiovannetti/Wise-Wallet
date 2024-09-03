import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPaswword';
import { Transactions } from './pages/Transactions';
import { ExpenseOverview } from './pages/ExpensesOverview';
import { BgDecorations } from './components/BgDecorsation';

export const App = () => {
  //dper muovere le palle devo fare una cosa come per la nav bar basata sul pathname che lo checka e in base a quello assegna la posizione
  return (
    <div>
      <Router>
        <main
          className={
            'relative flex flex-col h-auto min-h-screen  bg-oxfordBlue-100 font-raleway text-uranianBlue-100 overflow-hidden'
          }
        >
          <NavBar />
          <BgDecorations />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/registration' element={<Registration />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/change-password' element={<ResetPassword />}></Route>
            <Route path='/transactions' element={<Transactions />}></Route>
            <Route
              path='/expenses-overview'
              element={<ExpenseOverview />}
            ></Route>
          </Routes>
          <Footer />
        </main>
      </Router>
    </div>
  );
};
