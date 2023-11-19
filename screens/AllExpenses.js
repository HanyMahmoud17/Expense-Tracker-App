import ExpenseOutput from '../components/expenseOutput/ExpenseOutput';
import { useContext } from 'react';
import { ExpenseContext } from '../store/expenseContext';

function AllExpenses() {
  const expensesCTX=useContext(ExpenseContext);

  return <ExpenseOutput expenses={expensesCTX.expenses} expensePeriod={'Total'}/>
}

export default AllExpenses;
