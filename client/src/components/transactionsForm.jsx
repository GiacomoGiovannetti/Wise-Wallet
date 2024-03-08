import { useState } from 'react';

export const TransactionsForm = ({ showForm }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  console.log(formData);

  const preventSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col items-center drop-shadow-xl'>
      <form
        name='addTransaction'
        method='post'
        action=''
        onSubmit={preventSubmit}
        className='flex flex-col items-center z-10 md:text-2xl lg:text-3xl xl:text-2xl'
      >
        <div className=' flex flex-col  items-start md:flex-row md:items-center'>
          <label htmlFor='amount'>Amount:</label>
          <input
            type='number'
            name='amount'
            id='amount'
            value={formData.value}
            onChange={(e) => {
              setFormData({ ...formData, amount: e.target.value });
            }}
            placeholder='000.00'
            autoComplete='off'
            className='form-input md:ml-2'
          ></input>
        </div>
        <div className=' flex flex-col  items-start md:flex-row md:items-center'>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            name='date'
            id='date'
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className='form-input md:ml-2'
          ></input>
        </div>
        <div className=' flex flex-col  items-start md:flex-row md:items-center'>
          <label htmlFor='category'>Category:</label>
          <input
            type='text'
            name='category'
            id='category'
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder='groceries'
            autoComplete='off'
            className='form-input md:ml-2'
          ></input>
        </div>
        <div className=' flex flex-col  items-start md:flex-row md:items-center'>
          <label htmlFor='Description'>Description:</label>
          <input
            type='textarea'
            name='description'
            id='description'
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            autoComplete='off'
            className='form-input md:ml-2'
          ></input>
        </div>
        <input
          type='submit'
          value='Add'
          className='button px-8 mt-4 mb-2 md:mt-8 md:mb-4 '
        ></input>
      </form>

      <p
        className='underline cursor-pointer self-end md:text-2xl lg:text-3xl xl:text-2xl'
        onClick={() => showForm()}
      >
        Close
      </p>
    </div>
  );
};
