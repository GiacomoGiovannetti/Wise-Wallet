import { useEffect, useState } from 'react';
import { TransactionsView } from '../components/TransactionsView';
import { TransactionsForm } from '../components/transactionsForm';

export const Transactions = () => {
  const [formActive, setFormActive] = useState(false);

  const showForm = (e) => {
    setFormActive((prev) => !prev);
  };

  useEffect(() => {
    console.log(formActive);
  });

  return (
    <section className='flex flex-col items-center mt-28 z-10'>
      <h1
        onClick={showForm}
        className={`button text-4xl px-10 py-3 md:text-6xl md:px-16 md:py-5 lg:text-5xl ${
          !formActive ? 'block' : 'hidden'
        }`}>
        Add Transaction
      </h1>
      <div>
        {formActive && (
          <TransactionsForm setFormActive={setFormActive} showForm={showForm} />
        )}
      </div>
      <TransactionsView />
    </section>
  );
};
