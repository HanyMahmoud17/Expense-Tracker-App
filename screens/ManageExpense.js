import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import ExpenseForm from "../components/manageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const expenseIdIsExisting = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseIdIsExisting ? "editing Expense" : "adding Expense",
    });
  }, [navigation, expenseIdIsExisting]);

  function deleteExpense() {
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function updateHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.btnsContainer}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={updateHandler}>
          {expenseIdIsExisting ? "Update" : "Add"}
        </Button>
      </View>
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
  button: {
    marginHorizontal: 8,
    minWidth: 120,
  },
  btnsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // gap:8
  },
});
