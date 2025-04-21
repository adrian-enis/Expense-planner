import React, { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

const BudgetTracker = () => {
  const {state, totalExpense, remainingBudget, dispatch } = useBudget();
  const percentage = +((totalExpense / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
      <CircularProgressbar 
      value={percentage} 
      text={`${percentage}%Budget`}
      styles={buildStyles({
        pathColor: percentage === 100 ? "#dc2626" : "#3b82f6",
        trailColor: "#f5f5f5",
        textSize:10
        
      })}
      
      />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 hover:bg-pink-700   w-full uppercase text-white font-bold rounded-lg p-3 cursor-pointer"
          onClick={() => dispatch({type:"reset-app"})}
        >
          Reset App
        </button>
        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Available" amount={remainingBudget} />
        <AmountDisplay label="Spent" amount={totalExpense}  />
      </div>
    </div>
  );
};

export default BudgetTracker;
