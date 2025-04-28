import React, { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

const BudgetTracker = () => {
  /**
 * Extrae valores del contexto de presupuesto.
 * @type {{ state: Object, totalExpense: number, remainingBudget: number, dispatch: Function }}
 */

  const {state, totalExpense, remainingBudget, dispatch } = useBudget();

  /**
 * Calcula el porcentaje de gasto basado en el presupuesto total.
 * @type {number}
 */

  const percentage = +((totalExpense / state.budget) * 100).toFixed(2)

  /**
 * Componente de barra de progreso circular que muestra el porcentaje de presupuesto utilizado.
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.value - Valor del progreso basado en el porcentaje del presupuesto.
 * @param {string} props.text - Texto que se muestra dentro de la barra de progreso.
 * @param {Object} props.styles - Estilos personalizados de la barra de progreso.
 * @param {string} props.styles.pathColor - Color del indicador de progreso.
 * @param {string} props.styles.trailColor - Color del fondo de la barra.
 * @param {number} props.styles.textSize - Tamaño del texto dentro de la barra.
 */

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
