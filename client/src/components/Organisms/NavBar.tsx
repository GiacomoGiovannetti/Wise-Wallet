import { useEffect } from 'react';
import { FaUser, FaUserPlus, FaUserXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import walletIcon from '../../assets/wallet.svg';
import { useLogout } from '../../hooks/useLogout';
import { authentication } from '../../redux/slices/authSlice';

interface Props {
  className?: string;
}

export const NavBar = ({ className }: Props) => {
  const { logout } = useLogout();
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const { user } = auth;

  const handleClick = () => {
    logout();
  };

  //valuta se metterlo in app/homepage component
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '');
    console.log(user);
    if (user) {
      dispatch(authentication({ type: 'LOGIN', content: user }));
    }
  }, []);

  return (
    <header
      className={`sticky top-0 h-auto flex items-center justify-between bg-oxfordBlue-100 drop-shadow-xl z-10 ${className}`}
    >
      <div>
        <NavLink
          to='/'
          className='ml-5 my-3 flex items-center md:ml-10 md:my-6'
        >
          <img
            alt='wallet icon'
            src={walletIcon}
            className='h-4 md:h-7 lg:h-9 '
          ></img>
          <h3 className=' ml-1 text-xl font-semibold md:ml-2 md:text-3xl lg:text-5xl '>
            Wise Wallet
          </h3>
        </NavLink>
      </div>

      <div>
        <nav>
          {user && (
            <div>
              <NavLink
                to='/'
                className='mr-5 md:mr-10 flex items-center'
                onClick={handleClick}
              >
                <FaUserXmark className='text-xl md:text-3xl lg:text-4xl' />
                <p className='hidden text-2xl ml-2  md:inline-block lg:text-3xl'>
                  Logout
                </p>
              </NavLink>
            </div>
          )}
          {!user && (
            <div className='flex  items-center mr-5 md:mr-10'>
              <NavLink to='/login' className='mr-5 md:mr-10 flex items-center'>
                <FaUser className=' md:text-2xl lg:text-3xl' />
                <p className='hidden text-2xl ml-2  md:inline-block lg:text-3xl'>
                  Accedi
                </p>
              </NavLink>
              <NavLink to='/registration' className='flex items-center'>
                <FaUserPlus className='text-xl md:text-3xl lg:text-4xl' />
                <p className='hidden text-2xl ml-2  md:inline-block lg:text-3xl'>
                  Registrati
                </p>
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
