import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import CustomButton from './components/custombutton';
import { openDatabase } from 'react-native-sqlite-storage';
import { useIsFocused } from '@react-navigation/core';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

var db = openDatabase({ name: 'Users.db' });

const Register = ({ navigation }) => {

    const createTables = () => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(40), phone varchar(20), email varchar(60), facebook varchar(60), image varchar(1000))`,
                [],
                (sql, res) => {
                    console.log('table created successfully');
                },
                error => {
                    console.log('error on creating table ' + error.message);
                }
            )
        })
    }

    let addusers = () => {
        console.log(name, phone, email, facebook, image);
        if (!name) {
            Alert.alert(
                'Thông Báo',
                'Họ Tên không được để trống');
            return;
        }
        if (!phone) {
            Alert.alert(
                'Thông Báo',
                'Số điện thoại không được để trống');
            return;
        }
        if (!email) {
            Alert.alert(
                'Thông Báo',
                'Email không được để trống');
            return;
        }
        if (!facebook) {
            Alert.alert(
                'Thông Báo',
                'Facebook không được để trống');
            return;
        }
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO users (name, phone, email, facebook, image) VALUES (?,?,?,?,?)`,
                [name, phone, email, facebook, image],
                (tx, res) => {
                    console.log('Results', res.rowsAffected);
                    if (res.rowsAffected > 0) {
                        Alert.alert(
                            'Thông Báo',
                            'Thêm Thành Công',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => {
                                        navigation.navigate('viewall')
                                    },
                                },
                            ],
                            { cancelable: true }
                        );
                    } else alert('Thêm lỗi !');
                }
            )
        })
    }

    const openCamera = () => {
        const options = {
            storageOption: {
                path: 'images',
                mediatype: 'photo',
            },
            includeBase64: true,
            cameraType: 'back',
        };

        launchCamera(options, response => {
            //onsole.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancalled image picker');
            } else if (response.errorCode) {
                console.log('Error Code: ', response.errorCode);
            } else {
                const soure = response.assets;
                setimage(soure[0].uri);
                setshowModal(false);
            }
        })
    }

    const openLibraryImage = () => {
        const options = {
            storageOption: {
                path: 'images',
                mediatype: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancalled image picker');
            } else if (response.errorCode) {
                console.log('Error Code: ', response.errorCode);
            } else {
                const soure = response.assets;
                setimage(soure[0].uri);
                setshowModal(false);
            }
        })
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        createTables();
        myTextInput1.current.clear();
        myTextInput2.current.clear();
        myTextInput3.current.clear();
        myTextInput4.current.clear();
        setimage(undefined);
    }, [isFocused]);

    const [name, setname] = useState();
    const [phone, setphone] = useState();
    const [email, setemail] = useState();
    const [facebook, setfacebook] = useState();
    const [image, setimage] = useState();
    const [showModal, setshowModal] = useState(false);
    const myTextInput1 = React.createRef();
    const myTextInput2 = React.createRef();
    const myTextInput3 = React.createRef();
    const myTextInput4 = React.createRef();

    return (
        <ScrollView 
        style={styles.view}
        keyboardDismissMode='on-drag'
        >
            <View style={styles.viewtop}>
                <Text style={styles.texttop1}>Friendlist</Text>
                <Text style={styles.texttop2}>Good friends are hard to find, harder</Text>
                <Text style={styles.texttop2}>to leave, and impossible to forget</Text>
                <Text style={styles.texttop3}>Developers: Nguyen Minh Hoang</Text>
            </View>
            <View style={styles.viewinside}>
                <TouchableOpacity
                    onPress={() => { setshowModal(true) }}
                >
                    <Image
                        source={{ uri: image }}
                        style={styles.viewimg}
                    ></Image>
                </TouchableOpacity>
                <TextInput
                    placeholder='Họ Và Tên'
                    style={styles.input}
                    onChangeText={(text) => { setname(text) }}
                    ref={myTextInput1}
                ></TextInput>
                <TextInput
                    placeholder='Số điện thoại'
                    style={styles.input}
                    onChangeText={(text) => { setphone(text) }}
                    keyboardType='phone-pad'
                    ref={myTextInput2}
                ></TextInput>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={(text) => { setemail(text) }}
                    ref={myTextInput3}
                ></TextInput>
                <TextInput
                    placeholder='Facebook'
                    style={styles.inputlater}
                    onChangeText={(text) => { setfacebook(text) }}
                    ref={myTextInput4}
                ></TextInput>
                <CustomButton
                    title='Register'
                    onPress={addusers}
                />
                <View style={styles.modalview}>
                    <Modal
                        visible={showModal}
                        transparent
                        onRequestClose={() => setshowModal(false)}
                        animationType='slide'
                        hardwareAccelerated
                    >
                        <View style={styles.modalview}>
                            <View style={styles.modalbackground}>
                                <View style={styles.modalheader}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Select Avatar</Text>
                                </View>
                                <View style={styles.buttonmodal1}>
                                    <TouchableOpacity
                                    onPress={openCamera}
                                    >
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 22, marginLeft: 20 }}>Take Photo...</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonmodal1}>
                                    <TouchableOpacity
                                    onPress={openLibraryImage}
                                    >
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 22, marginLeft: 20 }}>Choose Image...</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonmodal2}>
                                    <TouchableOpacity
                                    onPress={() => setshowModal(false)}
                                    >
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 22, marginLeft: 20}}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#f47564',
    },
    viewtop: {
        width: '100%',
        height: '13%',
        alignItems: 'center',
        paddingTop: 10
    },
    viewinside: {
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 19.8,
        backgroundColor: '#ffffff',
        width: '89%',
        height: '74%',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 10,
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 6,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        marginVertical: 10,
        fontSize: 15,
        paddingLeft: 20
    },
    inputlater: {
        width: '90%',
        height: 50,
        borderRadius: 6,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 30,
        paddingLeft: 20,
        fontSize: 15
    },
    viewimg: {
        borderWidth: 2,
        borderColor: '#a9a9a9',
        width: 70,
        height: 70,
        borderRadius: 20,
    },
    texttop1: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    texttop2: {
        fontSize: 15,
        color: '#ffffff'
    },
    texttop3: {
        fontSize: 9,
        color: '#ffffff',
        paddingTop: 30,
        paddingRight: 150
    },
    modalview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalbackground: {
        width: 300,
        height: 300,
        backgroundColor: '#ffffff',
        borderColor: '#000',
        flexDirection: 'column',
    },
    modalheader: {
        width: '100%',
        height: '25%',
        borderBottomWidth: 4,
        borderColor: '#c6eef8',
        justifyContent: 'center',
        paddingLeft: 20
    },
    buttonmodal1: {
        width: '100%',
        height: '25%',
        borderBottomWidth: 1.5,
        borderColor: '#dcdcdcdc',
        justifyContent: 'center',
    },
    buttonmodal2: {
        width: '100%',
        height: '24%',
        justifyContent: 'center',
    }
})

export default Register;
