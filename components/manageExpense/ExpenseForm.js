import { View, StyleSheet, Text, Alert } from "react-native";

import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormatedDate } from "../../util/date";

function ExpenseForm({
  submitButtonLabel,
  cancelHandler,
  onSubmit,
  defaultValues,
}) {
  // hint : i make the initial value to be an empty string because in the input field return string
  // but i am here need to make a new thing
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormatedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inpuIdentifier, enterdValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inpuIdentifier]: { value: enterdValue, isValid: true },
      };
    });
  }
  // console.log(inputValues);

  function submitForm() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    // make validation
    const amountIsValid =
      !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input','Please enter a valid inputs')
      setInputs((currentInput) => {
        return {
          amount: { value: currentInput.amount.value, isValid: amountIsValid },
          date: { value: currentInput.date.value, isValid: dateIsValid },
          description: {
            value: currentInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    // send to the screen of manage expense
    onSubmit(expenseData);
  }

  // check for valid inputs
  const formIsValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.text}> Your Expense </Text>
      <View style={styles.inputContainer}>
        <Input
          label="Amount"
          inValid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.inputStyle}
        />
        <Input
          label="Date"
          inValid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.inputStyle}
        />
      </View>
      <Input
        label="Description"
        inValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />
      {/* message of validation  */}
      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid inputs values - check it again
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
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
