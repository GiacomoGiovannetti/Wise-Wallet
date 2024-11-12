import { useState } from 'react';
import { BalanceChart } from '../components/BalanceChart';
import { CategoryChart } from '../components/CategoryChart';
import { TransactionsView } from '../components/TransactionsView';

export const ExpenseOverview = () => {
  const [expenseInterval, setExpenseInterval] = useState(30);

  console.log(expenseInterval);

  return (
    <section className='z-10 flex flex-col items-center '>
      <div className='self-start ml-2 mt-2 text-lg md:text-2xl lg:text-3xl xl:text-2xl '>
        <label htmlFor='select-interval'>Select Interval: </label>
        <select
          name='selectInterval'
          id='select-interval'
          value={expenseInterval}
          onChange={(e) => setExpenseInterval(parseInt(e.target.value))}
          className='form-input w-28 focus:bg-oxfordBlue-100 outline-none ml-2 mb:w-32 lg:w-40 xl:w-32'
        >
          <option value='30'>30 gg</option>
          <option value='60'>60 gg</option>
          <option value='90'>90 gg</option>
          <option value='180'>6 mesi</option>
          <option value='365'>12 mesi</option>
        </select>
      </div>
      <h1 className='text-6xl font-semibold my-5 md:text-8xl lg:text-9xl xl:text-8xl'>
        1206.36
      </h1>
      <div className='flex flex-col items-center'>
        <BalanceChart />
        <CategoryChart />
      </div>
      <TransactionsView />
    </section>
  );
};
