import walletIcon from '../assets/wallet.svg';
import { NavLink } from 'react-router-dom';
import { FaUser, FaUserPlus } from 'react-icons/fa6';

export const NavBar = () => {
  return (
    <header className='sticky top-0 h-auto flex items-center justify-between bg-oxfordBlue-100 drop-shadow-xl z-20'>
      <div>
        <NavLink to='/' className='ml-5 my-3 flex items-center'>
          <img alt='wallet icon' src={walletIcon} className='h-4'></img>
          <h3 className=' ml-1 text-xl font-semibold'>Wise Wallet</h3>
        </NavLink>
      </div>
      <div>
        <nav className='flex  items-center mr-5'>
          <NavLink to='/login' className='mr-5'>
            <FaUser className='' />
          </NavLink>
          <NavLink to='/registration'>
            <FaUserPlus className='text-xl' />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
