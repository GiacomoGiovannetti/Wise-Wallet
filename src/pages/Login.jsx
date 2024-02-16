import { NavLink } from 'react-router-dom';

export const Login = () => {
  return (
    <section className='flex flex-col items-center mt-28 md:mt-64 lg:mt-28'>
      <h1 className='text-4xl font-semibold mb-8 z-10 md:text-6xl'>Login</h1>
      <form
        name='login'
        method='post'
        action=''
        className='flex flex-col items-center z-10 md:text-2xl '>
        <div className='flex flex-col items-start'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='johndoe@example.com'
            className='form-input autofill-bg-color'></input>

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='password'
            className='form-input autofill-bg-color'></input>
          <NavLink
            to='/forgot-password'
            className='underline cursor-pointer text-sm   w-52 mb-2 md:text-lg'>
            Password dimenticata ?
          </NavLink>
        </div>
        <input
          type='submit'
          value='Login'
          className='button px-8 mt-4 mb-2 md:mt-8 md:mb-4'></input>
        <p>
          Not yet registered ?
          <NavLink to='/registration' className='ml-1 underline cursor-pointer'>
            Sign up here!
          </NavLink>
        </p>
      </form>
    </section>
  );
};
