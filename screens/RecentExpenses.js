import ExpenseOutput from "../components/expenseOutput/ExpenseOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expenseContext";
// import getDateMinusDays from "../util/date";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetch,setIsFetch]=useState(true);
  const [isError,setIsError]=useState();
  const expensesCTX = useContext(ExpenseContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetch(true)
      try{
        const expenses = await fetchExpenses();
        expensesCTX.setExpenses(expenses);

      }catch(isError){
        setIsError("Can't fetch expenses")
      }
      setIsFetch(false);
    }

    getExpenses();
  }, []);

  if(isError && !isFetch){
    return <ErrorOverlay message={isError} />
  }

  if(isFetch){
    return <LoadingOverlay/>
  }

  const recentExpenses = expensesCTX.expenses.filter((expense) => {
    const today = new Date();
    const days7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > days7DaysAgo;
  });

  return (
    <ExpenseOutput expenses={recentExpenses} expensePeriod={"Last 7 Days"} />
  );
}

export default RecentExpenses;
