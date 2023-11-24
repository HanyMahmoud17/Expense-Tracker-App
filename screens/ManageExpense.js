import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { ExpenseContext } from "../store/expenseContext";
import { storeExpense, updateExpense, deleteOneExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState();
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

  async function deleteExpense() {
    setIsSubmitting(true);
    try {
      //delete using firebase
      await deleteOneExpense(expenseId);
      expenseCTX.deleteExpense(expenseId);
      navigation.goBack();
    } catch (isError) {
      setIsError("can't delete expense try again");
      setIsSubmitting(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function updateHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    try {
      if (expenseIdIsExisting) {
        expenseCTX.updateExpense(expenseId, expenseData);
        // delete using firebse
        await updateExpense(expenseId, expenseData);
        // expenseCTX.updateExpense(expenseId,{
        //   description:'tessssst',
        //   amount:29.99,
        //   date:new Date('2023-11-1')
        // });
      } else {
        // add the data to firebase
        const id = await storeExpense(expenseData);
        expenseCTX.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (isError) {
      setIsError("can't update or add a new expense");
      setIsSubmitting(false);
    }
  }

  if (isError && !isSubmiting) {
    return <ErrorOverlay message={isError} />;
  }

  if (isSubmiting) {
    return <LoadingOverlay />;
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
