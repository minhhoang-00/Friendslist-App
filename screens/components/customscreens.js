import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomsScreens = (props) => {
    return(
        <View style = {Styles.view}>
            <Text style = {Styles.text}>
                {props.title}
            </Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 30
    }
})

export default CustomsScreens;