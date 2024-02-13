import homeImage from '../assets/home-image.png';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  return (
    <section className='flex flex-col items-center pt-12 md:pt-24'>
      <h1 className='text-4xl font-semibold mb-4 z-10 md:text-6xl md:mb-6'>
        Wise Wallet
      </h1>
      <div className='flex flex-col items-center md:flex-row md:items-start md:justify-evenly md:mx-28'>
        <div className='flex flex-col items-center'>
          <p className='font-medium text-center mx-10 z-10 md:text-xl md:px-28 md:pt-6'>
            Con Wise Wallet, puoi tenere traccia delle tue entrate e uscite in
            modo semplice e organizzato. Crea categorie personalizzate per
            suddividere le transazioni e visualizza i tuoi dati tramite i nostri
            grafici per ottenere una visione chiara della tua situazione
            economica
          </p>
          <NavLink to='/registration' className='mt-8 z-10'>
            <button className='text-lg text-oxfordBlue-100 leading-5 px-12 py-2.5 rounded-3xl bg-lightGreen font-extrabold md:px-16 md:py-4 md:text-2xl md:rounded-full md:mt-6'>
              Iniziamo
            </button>
          </NavLink>
        </div>
        <img
          alt='money management'
          src={homeImage}
          className='w-[80%] mt-2 z-10 md:mt-0 md:w-[40%]'></img>
      </div>
    </section>
  );
};
