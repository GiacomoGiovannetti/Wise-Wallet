import { useState } from 'react';
import { NavLink } from 'react-router';
import { useLogin } from '../../hooks/useLogin';
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(formData.email, formData.password);
  };

  return (
    <section className='flex flex-col items-center mt-28 md:mt-64 lg:mt-28'>
      <h1 className='text-4xl font-semibold mb-16 z-10 md:text-6xl md:mb-32 lg:text-8xl xl:mb-16 xl:text-6xl'>
        Login
      </h1>
      <form
        name='login'
        method='post'
        action=''
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center z-10 md:text-2xl lg:text-3xl xl:text-2xl '
      >
        <div className='flex flex-col items-start'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder='johndoe@example.com'
            className='form-input autofill-bg-color'
          ></input>

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder='password'
            className='form-input autofill-bg-color'
          ></input>
          <NavLink
            to='/forgot-password'
            className='underline cursor-pointer text-sm   w-52 mb-2 md:w-96 md:text-lg lg:text-2xl xl:w-72'
          >
            Password dimenticata ?
          </NavLink>
        </div>
        <input
          type='submit'
          value='Login'
          disabled={isLoading}
          className='button px-8 mt-4 mb-2 md:mt-8 md:mb-4'
        ></input>
        <p>
          Not yet registered ?
          <NavLink to='/registration' className='ml-1 underline cursor-pointer'>
            Sign up here!
          </NavLink>
        </p>
      </form>
      {error && <div className='bg-red-300'>{error}</div>}
    </section>
  );
}
