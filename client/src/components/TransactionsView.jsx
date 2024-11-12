export const TransactionsView = () => {
  //per la tabella ogni transazione sarà formata da una grid con 3 colonne e due righe
  // descriprtion prendererà 3 colonne e il tutto sarà dentro un div gestito con flex-col

  return (
    <section className='flex flex-col items-center mt-10'>
      <h3 className='text-2xl mb-4 md:text-5xl lg:text-6xl xl:text-4xl'>
        Recent transactions
      </h3>
      <div className='flex- flex-col items-center mb-8'>
        <div className='grid grid-cols-3 grid-row-2 gap-2 text-lg text-center border-b-2 border-uranianBlue-50 mb-4 md:text-3xl lg:text-4xl lg:border-b-4 xl:text-2xl'>
          <p className='col-span-1'>01/01/2024</p>
          <p className='col-span-1 italic'>Groceries</p>
          <p className='col-span-1'>169.69</p>
          <p className='col-span-3 text-base md:text-xl lg:text-2xl xl:text-lg'>
            Weekly grocery shopping
          </p>
        </div>
      </div>
    </section>
  );
};
