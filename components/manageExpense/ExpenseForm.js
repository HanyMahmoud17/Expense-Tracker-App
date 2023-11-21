import { View,StyleSheet, Text } from 'react-native';

import Input from './Input';
import { GlobalStyles } from '../../constants/styles';
import { useState } from 'react';

function ExpenseForm() {
  // hint : i make the initial value to be an empty string because in the input field return string
  // but i am here need to make a new thing
  const [inputValues,setInputValues]=useState({
    amount:'',
    date:'',
    description:'',
  });
  function inputChangedHandler(inpuIdentifier,enterdValue) {
    setInputValues((currentInput)=> {
      return {
        ...currentInput,
        [inpuIdentifier]:enterdValue
      }
    })
  }
console.log(inputValues);
  return (
    <View style={styles.form}>
      <Text style={styles.text}> Your Expense </Text>
      <View style={styles.inputContainer}>

      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: inputChangedHandler.bind(this, 'amount'),
          value:inputValues.amount
        }}
        style={styles.inputStyle}
        />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, 'date'),
          value:inputValues.date
        }}
        style={styles.inputStyle}
        />
        </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value:inputValues.description
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />
    </View>
  );
}

export default ExpenseForm;


const styles = StyleSheet.create({
  form:{
    marginTop:40,
    marginBottom:24
  },
  text:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    color:GlobalStyles.colors.primary100,
    marginBottom:12
  },
  inputContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  inputStyle:{
    flex:1
  }

})
