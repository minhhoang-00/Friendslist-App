import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = (props) => {
 return(
     <TouchableOpacity
     onPress = {props.onPress}
    activeOpacity = {0.5}
     >
         <View
         style = {styles.view}
         >
             <Text
             style = {styles.text}
             >{props.title}</Text>
         </View>
     </TouchableOpacity>
 )
}

const styles = StyleSheet.create({
    view:{
        width: 130,
        height: 50,
        backgroundColor: '#f47564',
        marginBottom: 20
    },
    text: {
        margin: 10,
        fontSize: 20,
        color: '#f8f8ff',
        textAlign: 'center'
    }
})

export default CustomButton