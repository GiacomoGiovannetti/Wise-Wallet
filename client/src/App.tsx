import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { BgDecorations, Footer } from './components/Molecules';
import { NavBar } from './components/Organisms/NavBar';
import ComponentsShowCase from './pages/ComponentsShowCase';
import { ExpenseOverview } from './pages/ExpensesOverview';
import { ForgotPassword } from './pages/ForgotPassword';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Registration } from './pages/Registration';
import { ResetPassword } from './pages/ResetPaswword';
import { Transactions } from './pages/Transactions';

export const App = () => {
  //dper muovere le palle devo fare una cosa come per la nav bar basata sul pathname che lo checka e in base a quello assegna la posizione

  const showShowcase = import.meta.env.VITE_SHOWCASE;

  console.log(showShowcase);

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
            {showShowcase && (
              <Route path='/components' element={<ComponentsShowCase />} />
            )}
            <Route path='/' element={<Home />}></Route>
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
