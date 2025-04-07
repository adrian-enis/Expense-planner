import React from "react";
import AmountDisplay from "./AmountDisplay";

const BudgetTracker = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img 
          src="/grafico.jpg" 
          alt="Donwload Image" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 hover:bg-pink-700   w-full uppercase text-white font-bold rounded-lg p-3 cursor-pointer"
        >
          Reset App
        </button>
        <AmountDisplay label="Budget" amount={300} />
        <AmountDisplay label="Available" amount={200} />
        <AmountDisplay label="Spent" amount={100} />
      </div>
    </div>
  );
};

export default BudgetTracker;
