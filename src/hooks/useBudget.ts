import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    if(!BudgetContext){
        throw new Error("useBudget must be used within BudgetProvider")
    }
    return context
}