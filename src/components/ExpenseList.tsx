import React from 'react'
import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget'
import { ExpenseDetails } from './ExpenseDetails';

export default function ExpenseList() {

  const {state} = useBudget();
  /**
 * Filtra los gastos según la categoría seleccionada.
 * Si hay una categoría activa, se muestran solo los gastos de esa categoría;
 * de lo contrario, se muestran todos los gastos.
 * @type {Array}
 */

  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

  
/**
 * Determina si la lista de gastos filtrados está vacía.
 * @type {boolean}
 */

  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

  return (
    <div className='mt-10 bg-white shadow-lg rounded-lg p-5'>
      {isEmpty ? <p className='text-gray-600 text-2xl font bold'>There are no expenses
        </p> : 
        <>
          <p className='text-gray-600 text-2xl font-bold my-5'>Expense List</p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetails key={expense.id} listExpense={expense}/>
          ))}
        </>
      }
    </div>
  )
}
