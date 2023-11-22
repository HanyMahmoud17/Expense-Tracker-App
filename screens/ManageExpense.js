import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { ExpenseContext } from "../store/expenseContext";

function ManageExpense({ route, navigation }) {
  const expenseCTX = useContext(ExpenseContext);

  const expenseId = route.params?.expenseId;
  const expenseIdIsExisting = !!expenseId;

  // get the specific expense
  const selectedExpense = expenseCTX.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseIdIsExisting ? "editing Expense" : "adding Expense",
    });
  }, [navigation, expenseIdIsExisting]);

  function deleteExpense() {
    expenseCTX.deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function updateHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (expenseIdIsExisting) {
      expenseCTX.updateExpense(expenseId, expenseData);
    } else {
      expenseCTX.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        submitButtonLabel={expenseIdIsExisting ? "Update" : "Add"}
        cancelHandler={cancelHandler}
        // here i pasa the selected expense
        defaultValues={selectedExpense}
      />
      <View style={styles.deleteExpense}>
        {expenseIdIsExisting && (
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpense}
          />
        )}
      </View>
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
  deleteExpense: {
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    marginTop: 16,
    paddingTop: 8,
  },
});
