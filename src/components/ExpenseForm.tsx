import React, { useEffect } from 'react'
import { useState, ChangeEvent } from 'react';
import { DrafExpensive, Value } from '../types';
import { categories } from '../data/categories'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from './ErrorMessage';
import { useBudget} from '../hooks/useBudget';


const ExpenseForm = () => {
  //Estate de gastos
  const [expense, setExpense] = useState<DrafExpensive>({
    expenseName:"",
    amount:0,
    category:"",
    date:new Date()
  })
  //State para los error
  const [error, setError] = useState("");
  const [previousAmount, setPreviousAmount] = useState(0)
  const {dispatch, state, remainingBudget} = useBudget();
  //Effec para saber cuando ocurren cambios en edit
  useEffect(() => {
    if(state.editingId){
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0];
      setExpense(editingExpense) 
      setPreviousAmount(editingExpense.amount)
    }
  }, [state.editingId])  

  //Manejar los cambios de los los formularios
  const handleChange= (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {

    //Verificacion de campos de entrada (number or string)
    const {name, value} = e.target
    const isAmountField = ["amount"].includes(name)
    setExpense({...expense, [name] : isAmountField ? +value : value})

  }

  //Manejar los cambios del calendario
  const handleChangeDate = (value : Value) => {
    setExpense({...expense, date:value})
  }
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //validate
    if(Object.values(expense).includes("")){
      return setError("all fields are required")
    }
    //Validar si se pasa del presupuesto (Evitamos Sobregiros presupuestarios)
    if((expense.amount - previousAmount) > remainingBudget){
      return setError("There is no budged")
    }

    //Add expense or editing expense
    if(state.editingId){
      dispatch({type:"update-expense", payload:{expense:{id:state.editingId, ...expense}}})
    }else{

      dispatch({type: "add-expenses", payload:{expense}})
    }

    //Reset form
    setExpense({
      expenseName:"",
      amount:0,
      category:"",
      date:new Date()
    })
  }
  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
        <legend 
          className=' uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
            {
              state.editingId ? "Save changes" : "New budget"
            }
          </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className='flex flex-col gap-2'>
            <label htmlFor='expenseName' 
                   className='text-xl'>Budged Name</label>
            <input 
              type="text" 
              id='expenseName' 
              placeholder='Added the name of Budget' 
              className='bg-slate-100 p-2' 
              name='expenseName'
              value={expense.expenseName}
              onChange={handleChange}/>
            

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
              name='amount'
              value={expense.amount}
              onChange={handleChange}/>
 
        </div>
        <div className='flex flex-col gap-2'>
            <label 
              htmlFor='category' 
              className='text-xl'>Category</label>
            <select 
              id='category' 
              className='bg-slate-100 p-2' 
              name='category'
              value={expense.category}
              onChange={handleChange}>
              <option value="">-- Select --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className='flex flex-col gap-2'>
              <label 
                htmlFor='expensiveDate' 
                className='text-xl'>Expensive Date</label>
              
              <DatePicker 
              className={"bg-slate-100 p-2 border-0"}
              value={expense.date}
              onChange={handleChangeDate}/>

            </div>
              
            <input 
              type="submit" 
              className='bg-blue-600 w-full p-2 rounded-lg uppercase font-bold text-white cursor-pointer hover:bg-blue-700' 
              value={state.editingId ? "Save changes" : "Record expense"} />
        </div>
    </form>
  )
}

export default ExpenseForm