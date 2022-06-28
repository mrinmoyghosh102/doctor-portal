import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import DashboardMultiDoc from "./screens/DashboardMultiDoc";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Dashboard" component={Dashboard} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <LoginScreen />
  );
}
