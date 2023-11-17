import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const ExpenseSummery = ({expenses,periodName}) => {
    const expernsesSum=expenses.reduce((sum,expense)=> {
       return sum + expense.amount 
    },0)


  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expernsesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpenseSummery

const styles = StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor: GlobalStyles.colors.primary50,
      borderRadius: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    period: {
      fontSize: 12,
      color: GlobalStyles.colors.primary400,
    },
    sum: {
      fontSize: 16,
      fontWeight: 'bold',
      color: GlobalStyles.colors.primary500,
    },
  });