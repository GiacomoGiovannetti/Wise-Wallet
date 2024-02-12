import homeImage from '../assets/home-image.png';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  console.log('dio me');
  return (
    <section className='h-screen flex flex-col items-center bg-oxfordBlue-100 pt-12 overflow-hidden'>
      <div className='absolute w-64 h-64 bg-gunMetal-100 rounded-full blur-2xl -right-16 -top-8 z-0'></div>
      <h1 className='text-4xl font-semibold mb-4 z-10'>Wise Wallet</h1>
      <p className='font-medium text-center mx-10 z-10'>
        Con Wise Wallet, puoi tenere traccia delle tue entrate e uscite in modo
        semplice e organizzato. Crea categorie personalizzate per suddividere le
        transazioni e visualizza i tuoi dati tramite i nostri grafici per
        ottenere una visione chiara della tua situazione economica
      </p>
      <NavLink to='/registration' className='mt-8 z-10'>
        <button className='text-lg text-oxfordBlue-100 leading-5 px-12 py-2.5 rounded-3xl bg-lightGreen font-extrabold'>
          Iniziamo
        </button>
      </NavLink>
      <img
        alt='money management'
        src={homeImage}
        className='w-[80%] mt-2 z-10 '></img>
      <div className='absolute w-64 h-64 bg-gunMetal-100 rounded-full blur-2xl -left-16 -bottom-20 z-0'></div>
    </section>
  );
};
