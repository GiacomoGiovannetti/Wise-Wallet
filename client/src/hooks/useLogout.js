import { useDispatch, useSelector } from 'react-redux';
import { authentication } from '../redux/slices/authSlice';

export const useLogout = () => {
  const auth = useSelector((state) => {
    state.auth.value;
  });
  const dispatch = useDispatch();

  const logout = () => {
    //remove user from storage
    localStorage.removeItem('user');

    //dispatch logout action
    dispatch(authentication({ type: 'LOGOUT' }));
  };

  return { logout };
};
