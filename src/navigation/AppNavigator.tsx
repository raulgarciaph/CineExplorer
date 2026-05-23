import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/SearchScreen";
import { NavigationContainer } from "@react-navigation/native";
import DetailScreen from "../screens/DetailScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

export type RootStackParamList = {
  Tabs: undefined,
  Detail: { imdbID: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1a1a1a', borderTopColor: '#3d2b00'},
        tabBarActiveTintColor: '#f5c518',
        tabBarInactiveTintColor: '#aaaaaa'
        }}>
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen 
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size}/>
          )
        }}/>
    </Tab.Navigator>
  )
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator}/>
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{ presentation: 'modal' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

