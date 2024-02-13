import walletIcon from '../assets/wallet.svg';
import { NavLink } from 'react-router-dom';
import { FaUser, FaUserPlus } from 'react-icons/fa6';

export const NavBar = () => {
  return (
    <header className='sticky top-0 h-auto flex items-center justify-between bg-oxfordBlue-100 drop-shadow-xl z-10 '>
      <div>
        <NavLink
          to='/'
          className='ml-5 my-3 flex items-center md:ml-10 md:my-6'>
          <img alt='wallet icon' src={walletIcon} className='h-4 md:h-7'></img>
          <h3 className=' ml-1 text-xl font-semibold md:ml-2 md:text-3xl'>
            Wise Wallet
          </h3>
        </NavLink>
      </div>
      <div>
        <nav className='flex  items-center mr-5 md:mr-10'>
          <NavLink to='/login' className='mr-5 md:mr-10 flex items-center'>
            <FaUser className=' md:text-2xl' />
            <p className='hidden text-2xl ml-2  md:inline-block '>Accedi</p>
          </NavLink>
          <NavLink to='/registration' className='flex items-center'>
            <FaUserPlus className='text-xl md:text-3xl' />
            <p className='hidden text-2xl ml-2  md:inline-block '>Registrati</p>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
