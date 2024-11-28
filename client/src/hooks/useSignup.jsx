import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { authentication } from '../redux/slices/authSlice';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signup = async (name, surname, email, password, confirmPassword) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post('/api/user/signup', {
        name,
        surname,
        email,
        password,
        confirmPassword,
      });
      console.log(response);
      const data = response.data;

      //save use to local storage
      localStorage.setItem('user', JSON.stringify(data));

      //update auth state
      dispatch(authentication({ type: 'LOGIN', content: data }));

      //redirect after registrer
      navigate('/transactions');

      setIsLoading(false);
    } catch (error) {
      const errorMessage = error.response.data.error;
      console.error('Error processing the submitted data', error);
      setIsLoading(false);
      setError(errorMessage);
    }
  };
  return { signup, isLoading, error };
};
