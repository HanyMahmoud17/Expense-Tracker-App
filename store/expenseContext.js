import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, date, amount }) => {},
  setExpenses:(expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, date, amount }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString();
      // return [{ ...action.payload, id: id }, ...state];
      // now i need to use the id from firebase
      return [action.payload, ...state];
      // this come from firebase
    case "SET":
      const inverted=action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updateExpenseIndex];
      const updateditem = { ...updatableExpense, ...action.payload.data };
      const updatableExpenses = [...state];
      updatableExpenses[updateExpenseIndex] = updateditem;
      return updatableExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
function ExpenseContextProvider({ children }) {
  // i use this because i had a complex manage state for different synario
  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses){
    dispatch({ type: "SET", payload:expenses})
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    setExpenses:setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
