import { View,StyleSheet, Text } from 'react-native';

import Input from './Input';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm() {
  function amountChangedHandler() {}

  return (
    <View style={styles.form}>
      <Text style={styles.text}> Your Expense </Text>
      <View style={styles.inputContainer}>

      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangedHandler,
        }}
        style={styles.inputStyle}
        />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: () => {},
        }}
        style={styles.inputStyle}
        />
        </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
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
