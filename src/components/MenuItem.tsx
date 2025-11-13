import React from 'react'
import{View, Text,StyleSheet} from 'react-native'
import { MenuItemType } from '../types/Types'

const MenuItem = ({item}:{item:MenuItemType})=>(
  <View style={styles.conatiner}>
    <Text style={styles.title}>{item.name}R{item.price.toFixed(2)}</Text>
    <Text>{item.description}</Text>
    <Text style={styles.course}>{item.course}</Text>
  </View>
)

const styles = StyleSheet.create({
  conatiner:{ 
    padding: 10, 
    borderBottomWidth: 1,
    borderColor:"#fdf9f9ff",
  },
  
  title:{
    
    fontWeight:"bold"

  },
  
  course:{

    fontStyle:'italic',
    marginTop:4
    
   
  },
    
  
})

export default MenuItem;