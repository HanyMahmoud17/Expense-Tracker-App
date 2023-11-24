import axios from "axios";

const BACKEND_URL='https://expense-app-3bb73-default-rtdb.firebaseio.com'

// add expense
export async function storeExpense(expenseData){

    const response=await axios.post(BACKEND_URL+'/expenses.json',
    expenseData
    )
    const id=response.data.name
    return id
}
// fetch data
export async function fetchExpenses(){
    const response = await axios.get(BACKEND_URL+'/expenses.json')
    const expenses=[];

    for(const key in response.data){
        const expenseObj={
            id:key,
            amount:response.data[key].amount,
            date: new Date(response.data[key].date),
            description:response.data[key].description,
        }

        expenses.push(expenseObj);
    }

    return expenses;

}

// update an expense

export function updateExpense(id,expenseData){
    return axios.put(BACKEND_URL + `/expenses/${id}.json`,expenseData)
}

// delete
export function deleteOneExpense(id){
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}

