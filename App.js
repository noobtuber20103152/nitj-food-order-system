import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthSignup } from './components/auth/signup';
import AuthLogin from './components/auth/login';
import Homepage from './src/homepage';
import Snackers from './src/snacker';
import FoodPage from './src/foodpage';
import Yadav from './src/yadav';
import CampusCafe from './src/campuscafe';
import NightCanteen from './src/canteen';
import Review from './src/review';
import Profile from './src/profile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ route, navigation }) {
  return <>
    <Homepage navigation={navigation} />
  </>
}

function SnackersScreen({ route, navigation }) {
  return <>
    <Snackers navigation={navigation} />
  </>
}
function NightCanteenScreen({ route, navigation }) {
  return <>
    <NightCanteen navigation={navigation} />
  </>
}
function YadavScreen({ route, navigation }) {
  return <>
    <Yadav navigation={navigation} />

  </>
}
function CampusCafeScreen({ route, navigation }) {
  return <>
    <CampusCafe navigation={navigation} />
  </>
}
function FoodScreen({ route, navigation }) {
  return <>
    <FoodPage route={route} navigation={navigation} />
  </>
}

function ReviewScreen({ route, navigation }) {
  return <>
    <Review route={route} navigation={navigation} />
  </>
}
function Signup({ route, navigation }) {
  return <>
    <AuthSignup navigation={navigation} />
  </>
}


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  function Login({ route, navigation }) {
    return <AuthLogin setIsLoggedIn={setIsLoggedIn} navigation={navigation} />
  }
  function ProfileScreen() {
    return <>
      {/* <Text>Profile</Text> */}
      <Profile/>
    </>
  }
  if (isLoggedIn) {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Snacker" component={SnackersScreen} />
            <Stack.Screen name="Campus Cafe" component={CampusCafeScreen} />
            <Stack.Screen name="Night Canteen" component={NightCanteenScreen} />
            <Stack.Screen name="Yadav" component={YadavScreen} />
            <Stack.Screen name="Food Page" component={FoodScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
  else {
    return <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  }

}