import { NavLink } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

export const RegistrationDesktop = ({ formData, setFormData }) => {
  const { name, surname, email, password, confirmPassword } = formData;
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, surname, email, password, confirmPassword);
  };
  return (
    <form
      name='registration'
      method='post'
      action=''
      onSubmit={handleSubmit}
      className='hidden lg:flex lg:flex-col text-2xl items-center z-10 '
    >
      <div className='flex flex-col items-start md:items-center'>
        <div className='flex flex-row mb-4 '>
          <div className='flex flex-col items-start'>
            <label htmlFor='name'>Name</label>
            <input
              className=' form-input autofill-bg-color'
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
              placeholder='John'
            ></input>
          </div>

          <div className='flex flex-col items-start ml-24'>
            <label htmlFor='surname'>Surname</label>
            <input
              className='form-input autofill-bg-color'
              type='text'
              name='surname'
              id='surname'
              value={surname}
              onChange={(e) => {
                setFormData({ ...formData, surname: e.target.value });
              }}
              placeholder='Doe'
            ></input>
          </div>
        </div>

        <div className='flex flex-col items-start mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            className='form-input w-96 autofill-bg-color'
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            placeholder='johndoe@example.com'
          ></input>
        </div>

        <div className='flex flex-row'>
          <div className='flex flex-col items-start'>
            <label htmlFor='password'>Password</label>
            <input
              className='form-input mb-1 '
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              placeholder='password'
            ></input>
            <p className='text-sm w-72 mb-4'>
              The password has to contain atleast 8 characters, a capital
              letter, a number and a special characters
            </p>
          </div>

          <div className='flex flex-col items-start ml-24'>
            <label htmlFor='confirm-password'>Confirm password</label>
            <input
              className='form-input'
              type='password'
              name='confirm-password'
              id='confirm-password'
              value={confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
              placeholder='confirm password'
            ></input>
          </div>
        </div>
      </div>
      <input
        type='submit'
        value='Register'
        disabled={isLoading}
        className='button px-8 lg:mt-3 lg:mb-3 '
      ></input>
      <p>
        Already signed up ?
        <NavLink to='/login' className='underline cursor-pointer'>
          Sign in Here!
        </NavLink>
      </p>

      {error && <div className='bg-red-300'>{error}</div>}
    </form>
  );
};
