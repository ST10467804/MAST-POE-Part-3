import React,{useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import ChefScreen from './src/screens/ChefScreen'
import FilterScreen from './src/screens/FilterScreen'
import { MenuItemType } from './src/types/Types'
import { initialMenu } from './src/data/MenuData'
import 'react-native-get-random-values';


export type RootStackParamList={
  Home: undefined
  Chef: undefined
  Filter: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App(){
  const[menuItems,setMenuItems]= useState<MenuItemType[]>(initialMenu);

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home">
          {props=><HomeScreen{...props}menuItems={menuItems}/>}
        </Stack.Screen>
        <Stack.Screen name="Chef">
          {props=><ChefScreen{...props}setMenuItems={setMenuItems}menuItems={menuItems}/>}
        </Stack.Screen>
        <Stack.Screen name="Filter">
          {props=><FilterScreen{...props}menuItems={menuItems}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
