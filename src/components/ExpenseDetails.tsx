import React from 'react'
import { Expense } from '../types'
import { formatDate } from '../helpers'
import AmountDisplay from './AmountDisplay'

type ExpenseDetailsProps = {
    listExpense: Expense
}

export const ExpenseDetails = ({listExpense}:ExpenseDetailsProps) => {
  return (
    <div className='bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center'>
        <div>

        </div>
        <div>
            <p>{listExpense.expenseName}</p>
            <p className='text-slate-600 text-sm'>{formatDate(listExpense.date!.toString())}</p>
        </div>
        <AmountDisplay amount={listExpense.amount}/>
    </div>
  )
}
