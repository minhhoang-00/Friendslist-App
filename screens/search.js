import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image } from 'react-native';
import CustomButton from './components/custombutton';
import { useIsFocused } from '@react-navigation/core';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'Users.db' });

const Search = ({ navigation }) => {

    const [searchname, setsearchname] = useState();
    const [name, setname] = useState();
    const [phone, setphone] = useState();
    const [email, setemail] = useState();
    const [facebook, setfacebook] = useState();
    const [image, setimage] = useState();
    const myTextInput1 = React.createRef();

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM users WHERE name = ?",
                    [searchname],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            setname(results.rows.item(0).name);
                            setphone(results.rows.item(0).phone);
                            setemail(results.rows.item(0).email);
                            setfacebook(results.rows.item(0).facebook);
                            setimage(results.rows.item(0).image);
                        } else {
                            console.log('no user');
                            Alert.alert(
                                'Thông Báo',
                                'Không có kết quả phù hợp'
                                );
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        myTextInput1.current.clear();
        setname(undefined);
        setphone(undefined);
        setemail(undefined);
        setfacebook(undefined);
        setimage(undefined);
    }, [isFocused]);

    return (
        <View style={styles.view}>
                <View style={styles.viewtop}>
                <Image
                    source={{uri: image}}
                    style={styles.viewimg}
                ></Image>
                    <Text style={styles.textres}>Name: {name}</Text>
                    <Text style={styles.textres}>Phone: {phone}</Text>
                    <Text style={styles.textres}>Gmail: {email}</Text>
                    <Text style={styles.textres}>Facebook: {facebook}</Text>
                </View>
                <View style={styles.viewbottom}>
                <TextInput
                    placeholder='Họ Và Tên'
                    style={styles.input}
                    onChangeText={(text) => { setsearchname(text) }}
                    ref={myTextInput1}
                ></TextInput>
                <CustomButton
                    title='Search'
                    onPress={getData}
                ></CustomButton>
                </View>
                
        </View>

    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#f47564',
        alignItems: 'center'
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 6,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        marginVertical: 20,
        fontSize: 15,
        paddingLeft: 20,
    },
    viewtop: {
        width: '89%',
        height: '55%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        paddingLeft: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        shadowColor: '#696969',
        elevation: 15
    },
    viewbottom: {
        height: '30%',
        width: '89%',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 20
    },
    textres: {
        fontSize: 18,
        color: '#f47564',
        fontWeight: 'bold',
        paddingVertical: 20
    },
    viewimg: {
        borderWidth: 2,
        borderColor: '#a9a9a9',
        width: 70,
        height: 70,
        borderRadius: 20,
        marginLeft: 110
    },
})

export default Search;
