import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authentication } from '../redux/slices/authSlice';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post('/api/user/login', { email, password });
      const data = response.data;

      //save user to local sotrage
      localStorage.setItem('user', JSON.stringify(data));

      //update auth state
      dispatch(authentication({ type: 'LOGIN', content: data }));

      //redirect after login
      navigate('/transactions');

      setIsLoading(false);
    } catch (error) {
      const errorMessage = error.response.data.error;
      console.error('Error processing the submitted data', error);
      setIsLoading(false);
      setError(errorMessage);
    }
  };

  return { login, isLoading, error };
};
