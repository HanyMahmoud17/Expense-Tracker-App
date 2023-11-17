import { Text } from 'react-native';
import ExpenseOutput from '../components/expenseOutput/ExpenseOutput';

function RecentExpenses() {
  return <ExpenseOutput expensePeriod={'Last 7 Days'}/>
}

export default RecentExpenses;
