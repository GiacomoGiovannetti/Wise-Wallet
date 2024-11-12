import { NavLink } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
export const RegistrationSmartphone = ({ formData, setFormData }) => {
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
      className='flex flex-col items-center z-10 md:text-2xl lg:text-3xl'
    >
      <div className='flex flex-col items-start'>
        <label htmlFor='name'>Name</label>
        <input
          className='form-input autofill-bg-color '
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
        <label htmlFor='email'>Email</label>
        <input
          className='form-input autofill-bg-color'
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          placeholder='johndoe@example.com'
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          className='form-input mb-1 autofill-bg-color '
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          placeholder='password'
        ></input>
        <p className='text-xs w-52 mb-2 opacity-80 md:w-96 md:text-base lg:text-xl'>
          The password has to contain atleast 8 characters, a capital letter, a
          number and a special characters
        </p>
        <label htmlFor='confirm-password'>Confirm password</label>
        <input
          className='form-input autofill-bg-color'
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
      <input
        type='submit'
        value='Register'
        disabled={isLoading}
        className='button px-8 mt-4 mb-2 md:mt-8 md:mb-4 '
      ></input>
      <p>
        Already signed up ?
        <NavLink to='/login' className='ml-1 underline cursor-pointer'>
          Sign in Here!
        </NavLink>
      </p>

      {error && <div className='bg-red-300'>{error}</div>}
    </form>
  );
};
