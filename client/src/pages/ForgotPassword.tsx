import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const ForgotPassword = () => {
  //valuta opzione di una page solo per invio email e cambio password creando due component per i form e sfruttando il conditional rendering

  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='flex flex-col items-center z-10 mt-28 md:mt-64 lg:mt-28'>
      <div className=' flex flex-col items-center mx-4'>
        <h1 className='text-3xl font-semibold  mb-2  md:text-6xl lg:text-8xl xl:text-6xl'>
          Forgot your password?
        </h1>
        <h5 className='mb-8 mx-4 md:text-xl lg:text-3xl xl:text-xl'>
          {`          Enter your email address e we'll send you the instructions to reset
          it.`}
        </h5>
      </div>
      <form
        name='forgotten-password'
        method='post'
        action=''
        onSubmit={handleSubmit}
        className='flex flex-col items-center z-10 md:text-2xl lg:text-3xl xl:text-2xl '
      >
        <div className='flex flex-col items-start'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='johndoe@example.com'
            className='form-input autofill-bg-color'
          ></input>
        </div>
        <NavLink to='/change-password'>
          <input
            type='submit'
            value='Send Instructions'
            className='button px-8 mt-4 mb-2 md:mt-8 md:mb-4'
          ></input>
        </NavLink>

        <p>
          Go back to
          <NavLink to='/login' className='underline cursor-pointer ml-1 '>
            Login page
          </NavLink>
        </p>
      </form>
    </section>
  );
};
