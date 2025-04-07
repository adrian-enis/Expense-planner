import React from 'react'
import { categories } from '../data/Categories'

const ExpenseForm = () => {
  return (
    <form className='space-y-5'>
        <legend 
          className=' uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>New Budget</legend>
        <div className='flex flex-col gap-2'>
            <label htmlFor='expenseName' 
                   className='text-xl'>Budged Name</label>
            <input 
              type="text" 
              id='expenseName' 
              placeholder='Added the name of Budget' 
              className='bg-slate-100 p-2' 
              name='expenseName'/>

        </div>
        <div className='flex flex-col gap-2'>
            <label 
              htmlFor='amount' 
              className='text-xl'>Amount</label>
            <input 
              type="number" 
              id='amount' 
              placeholder='Add the amount of the expense' 
              className='bg-slate-100 p-2' 
              name='amount'/>

        </div>
        <div className='flex flex-col gap-2'>
            <label 
              htmlFor='amount' 
              className='text-xl'>Category</label>
            <select 
              id='category' 
              className='bg-slate-100 p-2' 
              name='category'>
              <option value="">-- Select --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input 
              type="submit" 
              className='bg-blue-600 w-full p-2 rounded-lg uppercase font-bold text-white cursor-pointer hover:bg-blue-700' 
              value={"Record your spending"} />
        </div>
    </form>
  )
}

export default ExpenseForm