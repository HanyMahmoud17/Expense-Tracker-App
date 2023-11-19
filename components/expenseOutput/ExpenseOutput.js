import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ExpenseSummery from './ExpenseSummery'
import ExpenseList from './ExpenseList'
import { GlobalStyles } from '../../constants/styles';

const ExpenseOutput = ({expenses,expensePeriod}) => {
  return (
    <View style={styles.container}>
      <ExpenseSummery expenses={expenses} periodName={expensePeriod} />
      <ExpenseList expenses={expenses} />
    </View>
  )
}

export default ExpenseOutput

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: GlobalStyles.colors.primary700
    }
  });