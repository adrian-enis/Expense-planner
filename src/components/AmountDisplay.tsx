import { formatCurrency } from "../helpers"



/*
@params
 */
export type AmountDisplayProps = {
    label?: string
    amount:number
}
//El componente AmoundDisplay, muestra el texto donde se mostrara el monto(Budget:$00, Avalable:$00, Spent:$00)
const AmountDisplay = ({label, amount}:AmountDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {
        label && `${label} :`
      }
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay