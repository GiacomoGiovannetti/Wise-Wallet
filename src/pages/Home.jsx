import homeImage from '../assets/home-image.png';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  return (
    <section className='flex flex-col items-center pt-12 md:pt-24'>
      <h1 className='text-4xl font-semibold mb-4 z-10 md:text-6xl md:mb-6 lg:text-8xl lg:mb-16 xl:mb-6 xl:text-6xl 2xl:mb-24'>
        Wise Wallet
      </h1>
      <div className='flex flex-col items-center xl:flex-row xl:items-center xl:justify-evenly xl:mx-28 2xl:mx-56'>
        <div className='flex flex-col items-center'>
          <p className='font-medium text-center mx-10 z-10 md:text-xl md:px-28 md:pt-6 lg:text-3xl xl:mt-6 xl:text-xl'>
            Con Wise Wallet, puoi tenere traccia delle tue entrate e uscite in
            modo semplice e organizzato. Crea categorie personalizzate per
            suddividere le transazioni e visualizza i tuoi dati tramite i nostri
            grafici per ottenere una visione chiara della tua situazione
            economica
          </p>
          <NavLink to='/registration' className='mt-8 z-10 '>
            <button className='button'>Iniziamo</button>
          </NavLink>
        </div>
        <img
          alt='money management'
          src={homeImage}
          className='w-[80%] mt-6 z-10 md:mt-10 md:w-[60%] lg:mt-24 xl:mt-0 xl:w-[40%]'
        ></img>
      </div>
    </section>
  );
};
