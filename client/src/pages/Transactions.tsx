import { useEffect, useState } from 'react';
import { TransactionsForm, TransactionsView } from '../components/Organisms';

export const Transactions = () => {
  const [formActive, setFormActive] = useState(false);

  const showForm = () => {
    setFormActive((prev) => !prev);
  };

  useEffect(() => {
    console.log(formActive);
  });

  return (
    <section className='flex flex-col items-center mt-28 z-10'>
      {!formActive && (
        <h1
          onClick={showForm}
          className='button text-3xl px-10 py-3 md:text-6xl md:px-16 md:py-5 xl:text-5xl'
        >
          Add Transaction
        </h1>
      )}
      <div>
        {formActive && (
          <TransactionsForm showForm={showForm} />
          // <TransactionsForm setFormActive={setFormActive} showForm={showForm} />
        )}
      </div>
      <TransactionsView />
    </section>
  );
};
