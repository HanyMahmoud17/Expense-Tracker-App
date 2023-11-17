import { FlatList} from 'react-native'
import ExpenseItem from './ExpenseItem'

const ExpenseList = ({expenses}) => {

    function expensesHandler(itemData){
        return <ExpenseItem {...itemData.item} />
    }

  return (
   <FlatList data={expenses} renderItem={expensesHandler} keyExtractor={(item)=> item.id} />
  )
}

export default ExpenseList
