import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';


const Stack = createNativeStackNavigator();

const globalScreenOptions={
  headerStyle:{backgroundColor:'#2C6BED'},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white",
  headerBackTitleVisible:true
}

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login' screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login'component={LoginScreen} options={{title:"Login"}}/>
        <Stack.Screen name='Register' component={RegisterScreen} options={{headerBackTitleVisible:true,headerBackTitle:"Login"}}/>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddChat' component={AddChatScreen} options={{headerBackTitleVisible:true,headerBackTitle:"Login"}}/>
        <Stack.Screen name='Chat' component={ChatScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
