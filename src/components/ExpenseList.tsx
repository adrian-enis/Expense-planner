import React from 'react'
import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget'
import { ExpenseDetails } from './ExpenseDetails';

export default function ExpenseList() {

  const {state} = useBudget();
  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])
  console.log(state.expenses)
  return (
    <div className='mt-10 bg-white shadow-lg rounded-lg p-5'>
      {isEmpty ? <p className='text-gray-600 text-2xl font bold'>There are no expenses
        </p> : 
        <>
          <p className='text-gray-600 text-2xl font-bold my-5'>Expense List</p>
          {state.expenses.map ((listExpense) => (
            <ExpenseDetails key={listExpense.id} listExpense={listExpense}/>
          ))}
        </>
      }
    </div>
  )
}
