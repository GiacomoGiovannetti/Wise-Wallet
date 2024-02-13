import { NavLink } from 'react-router-dom';

export const Login = () => {
  return (
    <section>
      <h1>Login</h1>
      <form name='login' method='post' action=''>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='johndoe@example.com'></input>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='password'></input>
          <NavLink to='' className='underline cursor-pointer'>
            Password dimenticata ?
          </NavLink>
        </div>
        <input type='submit' value='login' className='button'></input>
        <p>
          Not yet registered ?
          <NavLink to='/registration' className='underline cursor-pointer'>
            Sign up here!
          </NavLink>
        </p>
      </form>
    </section>
  );
};
