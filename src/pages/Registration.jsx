import { NavLink } from 'react-router-dom';

export const Registration = () => {
  return (
    <section className='flex flex-col items-center mt-20 md:mt-12'>
      <h1 className='text-4xl font-semibold mb-8 z-10 md:text-6xl'>
        Registration
      </h1>
      <form
        name='registration'
        method='post'
        action=''
        className='flex flex-col items-center z-10'>
        <div className='flex flex-col items-start md:items-center'>
          <label htmlFor='name'>Name</label>
          <input
            className='form-input'
            type='text'
            name='name'
            id='name'
            placeholder='John'></input>
          <label htmlFor='surname'>Surname</label>
          <input
            className='form-input'
            type='text'
            name='surname'
            id='surname'
            placeholder='Doe'></input>
          <label htmlFor='email'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            id='email'
            placeholder='johndoe@example.com'></input>
          <label htmlFor='password'>Password</label>
          <input
            className='form-input mb-0 '
            type='password'
            name='password'
            id='password'
            placeholder='password'></input>
          <p className='text-xs w-52 mb-2'>
            The password has to contain atleast 8 characters, a capital letter,
            a number and a special characters
          </p>
          <label htmlFor='confirm-password'>Confirm password</label>
          <input
            className='form-input'
            type='password'
            name='confirm-password'
            id='confirm-password'
            placeholder='confirm password'></input>
        </div>
        <input
          type='submit'
          value='Register'
          className='button px-8 mt-4 mb-2 '></input>
        <p>
          Already signed up ?{' '}
          <NavLink to='/login' className='underline cursor-pointer'>
            Sign in Here!
          </NavLink>
        </p>
      </form>
    </section>
  );
};
