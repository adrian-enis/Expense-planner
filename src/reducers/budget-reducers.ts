import { v4 as uuidv4 } from "uuid"
import { Category, DrafExpensive, Expense } from "../types"



export type BudgetActions = 
{ type : 'add-budget', payload:{budget:number}} |
{ type: "show-modal"} |
{ type: "close-modal"} |
{ type: "add-expenses", payload:{expense:DrafExpensive}} |
{ type: "remove-expense", payload:{id:Expense["id"]}}   |
{ type: "get-expense-by-id", payload:{id:Expense["id"]}} |
{ type: "update-expense", payload:{expense: Expense}}   |
{ type: "reset-app"} |
{ type: "add-filter-category", payload:{id:Category["id"]}}


const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem("budget");
    return localStorageBudget ? +localStorageBudget : 0
}
const initialExpenses = () : Expense[] => {
    const localStorageExpense = localStorage.getItem("expenses");
    return localStorageExpense ? JSON.parse(localStorageExpense): [];
}


export type BudgetState = {                          
    budget: number  
    modal:boolean
    expenses:Expense[]
    editingId:Expense["id"]
    currentCategory: Category["id"]
}
export const initialState : BudgetState = {
    budget:initialBudget(),
    modal:false,
    expenses:initialExpenses(),
    editingId:"",
    currentCategory:""
}

const createExpense = (drafExpensive : DrafExpensive) : Expense => {
    return {
        ...drafExpensive,
        id: uuidv4()
    }
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
            modal:false,
            editingId:""
        }
    }
    if(action.type === "add-expenses"){
        const expense = createExpense(action.payload.expense)
        return{
            ...state,
            expenses:[...state.expenses, expense]
        }
    }

    if(action.type === "remove-expense"){
        return {
            ...state,
            expenses:state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }
    if(action.type === "get-expense-by-id"){
        return {
            ...state,
            editingId: action.payload.id,
            modal:true
        }
    }

    if(action.type === "update-expense"){
        return {
            ...state,
            expenses: state.expenses.map(
                expense => expense.id === action.payload.expense.id
                 ? action.payload.expense
                : expense),
                modal:false
        }
    }

    if(action.type === "reset-app"){
        return {
            ...state,
            budget:0,
            expenses:[],
        
        }
    }

    if(action.type === "add-filter-category"){  
        
        return{
            ...state,
            currentCategory:action.payload.id
        }
    }
    return state    
}