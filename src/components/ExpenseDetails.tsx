import  { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { Expense } from "../types";
import { formatDate } from "../helpers";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailsProps = {
  listExpense: Expense;
};



export const ExpenseDetails = ({ listExpense }: ExpenseDetailsProps) => {
  const {dispatch} = useBudget();
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === listExpense.category)[0],
    [listExpense]
  );
  const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => {dispatch({type:"get-expense-by-id", payload:{id:listExpense.id}})}} > 
      Update
    </SwipeAction>
  </LeadingActions>

  )
  const trailingActions = () => (
  <TrailingActions>
    <SwipeAction onClick={() => dispatch({type:"remove-expense", payload:{id:listExpense.id}})} destructive={true}> 
      Delete
    </SwipeAction>
  </TrailingActions>

  )

    

  return (
    <SwipeableList>
      <SwipeableListItem maxSwipe={1} leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="Budget Icon"
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2 ">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{listExpense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(listExpense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={listExpense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
