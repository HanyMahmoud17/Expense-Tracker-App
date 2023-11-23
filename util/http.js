import axios from "axios";

export function storeExpense(expenseData){

    axios.post('https://expense-app-3bb73-default-rtdb.firebaseio.com/expenses.json',
    expenseData
    )
}