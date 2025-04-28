import  { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

const BudgetForm = () => {

  /**
 * Estado para almacenar el presupuesto.
 * @type {number}
 */
  const [budget, setBudget] = useState(0)

  /**
 * Hook para obtener la función de dispatch del contexto de presupuesto.
 * @type {Function}
 */
  const {dispatch} = useBudget() 
  /**
   

 * Maneja el cambio en el campo de entrada y actualiza el estado del presupuesto.
 * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input.
 */
 
  /**
 * Calcula si el presupuesto es válido.
 * @type {boolean}
 */

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }
  const isValided = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  /**
 * Maneja el envío del formulario y despacha una acción para agregar el presupuesto.
 * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
 */

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type:"add-budget", payload:{budget}})
  }
  return (
    <form 
      className="space-y-5" 
      onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Define Budget
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Define your Budget"
          name="budget"
          value={budget }
          onChange={handleChange}
        />
      </div>
      <input 
        type="submit" 
        value="Define budget" 
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full 
         p-2 text-white font-bold disabled:opacity-5"
         disabled={isValided}
         />
         
    </form>
  );
};

export default BudgetForm;
