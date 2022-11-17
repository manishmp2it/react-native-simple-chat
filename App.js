import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#fff' },
  headerTitleStyle: { color: "black" },
  headerTintColor: "black",
  headerBackTitleVisible: true
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Loign' screenOptions={globalScreenOptions}>
          <Stack.Screen name='Login' component={LoginScreen} options={{ title: "Login" }} />
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShadowVisible: false,headerBackVisible:true, }} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='AddChat' component={AddChatScreen} options={{ headerBackTitleVisible: true, headerBackTitle: "Login" }} />
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

// eas build -p android --profile preview
