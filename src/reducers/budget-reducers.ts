import { v4 as uuidv4 } from "uuid"
import { DrafExpensive, Expense } from "../types"

export type BudgetActions = 
{ type : 'add-budget', payload:{budget:number}} |
{ type: "show-modal"} |
{ type: "close-modal"} |
{ type: "add-expenses", payload:{expense:DrafExpensive}}

export type BudgetState = {                          
    budget: number
    modal:boolean
    expenses:Expense[]
}

const createExpense = (drafExpensive : DrafExpensive) : Expense => {
    return {
        ...drafExpensive,
        id: uuidv4()
    }
}

export const initialState : BudgetState = {
    budget:0,
    modal:false,
    expenses:[]
}

export const budgetReducer = (
    state:BudgetState = initialState,
    action:BudgetActions
) => {
    
    if(action.type === "add-budget"){
        return {
            ...state,
            budget:action.payload.budget
        }
    }

    if(action.type === "show-modal"){
        return{
            ...state,
            modal:true
        }
    }
    if(action.type === "close-modal"){
        return{
            ...state,
            modal:false
        }
    }
    if(action.type === "add-expenses"){
        const expense = createExpense(action.payload.expense)
        return{
            ...state,
            expenses:[...state.expenses, expense]
        }
    }

    return state    
}