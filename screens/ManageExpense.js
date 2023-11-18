import { useLayoutEffect } from 'react';
import { Text } from 'react-native';

function ManageExpense({route,navigation}) {

  const expenseId=route.params?.expenseId;
  const expenseIdIsExisting= !!expenseId;

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: expenseIdIsExisting ? 'editing Expense' : 'adding Expense'
    })
  },[navigation,expenseIdIsExisting])

  return <Text>ManageExpense Screen</Text>;
}

export default ManageExpense;
