import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import ManageExpense from "./screens/ManageExpense";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="allExpense" component={AllExpenses} />
      <BottomTab.Screen name="recentExpense" component={RecentExpenses} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="expenseOverview" component={ExpenseOverview}/>
          <Stack.Screen name="manageExpense" component={ManageExpense}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
