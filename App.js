import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import ManageExpense from "./screens/ManageExpense";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpenseContextProvider from "./store/expenseContext";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <BottomTab.Navigator screenOptions={({navigation})=> ({
      headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
      headerTintColor:'white',
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor:GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => <IconButton icon="add" size={25} color={tintColor} onPress={()=> {
        navigation.navigate('manageExpense')
      }}  />
    })}>
      <BottomTab.Screen name="allExpense" component={AllExpenses} options={{
        title:'All Expense',
        tabBarLabel:'All Expense',
        tabBarIcon:({color,size})=> <Ionicons name="calendar" color={color} size={size}/>
      }}/>
      <BottomTab.Screen name="recentExpense" component={RecentExpenses} options={{
        title:'Recent Expense',
        tabBarLabel:'Recent',
        tabBarIcon:({color,size})=> <Ionicons name="hourglass" color={color} size={size}/>
      }}/>
      
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpenseContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
          headerTintColor :'white'
        }}>
          <Stack.Screen name="expenseOverview" component={ExpenseOverview} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="manageExpense" component={ManageExpense} options={{
            presentation:'modal'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
