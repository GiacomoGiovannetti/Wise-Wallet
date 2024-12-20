import { useState } from 'react';

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='flex flex-col items-center z-10 mt-28 md:mt-64 lg:mt-28'>
      <div className='flex flex-col items-center mx-4'>
        <h1 className='text-3xl font-semibold  mb-2  md:text-6xl lg:text-8xl xl:text-6xl'>
          Change password
        </h1>
        <p className='text-center mb-8 mx-4 md:text-xl md:text-center md:w-[65%] lg:text-3xl xl:text-xl '>
          The password has to contain atleast 8 characters, a capital letter, a
          number and a special characters
        </p>
      </div>
      <form
        name='reset-password'
        method='post'
        action=''
        onSubmit={handleSubmit}
        className='flex flex-col items-center z-10 md:text-2xl lg:text-3xl xl:text-2xl'
      >
        <div className='flex flex-col items-start'>
          <label htmlFor='password'>New Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            placeholder='password'
            className='form-input autofill-bg-color'
          ></input>
          <label htmlFor='confirm-password'>Confirm password</label>
          <input
            type='password'
            name='confirmPassword'
            id='confirm-password'
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
            placeholder='confirm password'
            className='form-input autofill-bg-color'
          ></input>
        </div>
        <input
          type='submit'
          value='Change password'
          className='button px-8 mt-4 mb-2 md:mt-8 md:mb-4'
        ></input>
      </form>
    </section>
  );
}
