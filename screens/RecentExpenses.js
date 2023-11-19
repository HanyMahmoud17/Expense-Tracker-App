import ExpenseOutput from '../components/expenseOutput/ExpenseOutput';
import { useContext } from 'react';
import { ExpenseContext } from '../store/expenseContext';
import getDateMinusDays from '../util/date';

function RecentExpenses() {
  const expensesCTX=useContext(ExpenseContext);

  const recentExpenses=expensesCTX.expenses.filter((expense)=>{
    const today= new Date();
    const days7DaysAgo=getDateMinusDays(today,7);

    return expense.date > days7DaysAgo

  })

  return <ExpenseOutput expenses={recentExpenses} expensePeriod={'Last 7 Days'}/>
}

export default RecentExpenses;
