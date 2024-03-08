import { useEffect, useState } from 'react';
import { RegistrationDesktop } from '../components/registrationDesktop';
import { RegistrationSmartphone } from '../components/registrationSmartphone';

export const Registration = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const detectWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', detectWidth);
    return () => {
      window.removeEventListener('resize', detectWidth);
    };
  }, [windowWidth]);

  return (
    <section className='flex flex-col items-center mt-20 md:mt-12'>
      <h1 className='text-4xl font-semibold mb-8 z-10 md:text-6xl md:mb-16 lg:mb-28 lg:mt-16 lg:text-8xl xl:text-6xl xl:mt-2 2xl:mb-32'>
        Registration
      </h1>
      {windowWidth < 1280 ? (
        <RegistrationSmartphone formData={formData} setFormData={setFormData} />
      ) : (
        <RegistrationDesktop formData={formData} setFormData={setFormData} />
      )}
    </section>
  );
};
