import { View, StyleSheet, Text } from "react-native";

import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import Button from "../UI/Button";

function ExpenseForm({submitButtonLabel,cancelHandler,onSubmit}) {
  // hint : i make the initial value to be an empty string because in the input field return string
  // but i am here need to make a new thing
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });
  function inputChangedHandler(inpuIdentifier, enterdValue) {
    setInputValues((currentInput) => {
      return {
        ...currentInput,
        [inpuIdentifier]: enterdValue,
      };
    });
  }
  // console.log(inputValues);

  function submitForm() {
    const expenseData={
      amount: +inputValues.amount,
      date:new Date(inputValues.date),
      description: inputValues.description
    }

    // send to the screen of manage expense

    onSubmit(expenseData)
  }
  return (
    <View style={styles.form}>
      <Text style={styles.text}> Your Expense </Text>
      <View style={styles.inputContainer}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
          style={styles.inputStyle}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
          style={styles.inputStyle}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />
      <View style={styles.btnsContainer}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitForm}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    marginBottom: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.primary100,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputStyle: {
    flex: 1,
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
