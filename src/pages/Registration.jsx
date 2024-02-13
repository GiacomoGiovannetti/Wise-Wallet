import { RegistrationDesktop } from '../components/registrationDesktop';
import { RegistrationSmartphone } from '../components/registrationSmartphone';

export const Registration = () => {
  return (
    <section className='flex flex-col items-center mt-20 md:mt-12'>
      <h1 className='text-4xl font-semibold mb-8 z-10 md:text-6xl'>
        Registration
      </h1>
      <RegistrationDesktop />
      <RegistrationSmartphone />
    </section>
  );
};
