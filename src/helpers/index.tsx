/**
 * Formatea una cantidad numérica como una moneda en dólares estadounidenses.
 * @param {number} amount - Cantidad a formatear.
 * @returns {string} - Cantidad formateada como moneda en USD.
 */

export function formatCurrency(amount:number){
    return new Intl.NumberFormat("en-US", {style:"currency", currency: "USD"}).format(amount)
}

/**
 * Convierte una cadena de fecha en un formato legible con día, mes y año en español.
 * @param {string} dateStr - Fecha en formato de cadena.
 * @returns {string} - Fecha formateada con detalles como día de la semana, mes y año.
 */

export function formatDate(dateStr:string):string{
    const dateObject = new Date(dateStr);
    const options : Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month:"long",
        day:"numeric"
    }

    return new Intl.DateTimeFormat("es-ES", options).format(dateObject)
}       