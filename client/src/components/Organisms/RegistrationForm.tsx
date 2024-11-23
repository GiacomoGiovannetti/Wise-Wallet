import { NavLink } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import { RegistrationFormData } from '../../utils/types';

interface Props {
  formData: RegistrationFormData;
  setFormData: (formData: RegistrationFormData) => void;
}

export const RegistrationDesktop = ({ formData, setFormData }: Props) => {
  const { name, surname, email, password, confirmPassword } = formData;
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        disabled={isLoading ? isLoading : false}
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

export const RegistrationMobile = ({ formData, setFormData }: Props) => {
  const { name, surname, email, password, confirmPassword } = formData;
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
