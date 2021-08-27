import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity, Modal } from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'Users.db' });


const ViewAll = ({ navigation }) => {

    const [data, setdata] = useState([]);
    const [showChooseModal, setShowChooseModal] = useState(false);
    const [showDetailsModal, setshowDetailsModal] = useState(false);
    const [nameModal, setnameModal] = useState();
    const [phoneModal, setphoneModal] = useState();
    const [emailModal, setemailModal] = useState();
    const [facebookModal, setfacebookModal] = useState();

    const isFocused = useIsFocused();

    const changmodal = () => {
        setShowChooseModal(false);
        setshowDetailsModal(true);
    }

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            let newdata = []
                            for (let i = 0; i < len; i++) {
                                let item = results.rows.item(i);
                                newdata.push({ name: item.name, phone: item.phone, email: item.email, facebook: item.facebook, image: item.image });
                            }
                            setdata(newdata);
                        } else {
                            setdata([]);
                            console.log('no user');
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [isFocused]);

    const renderData = ({ item }) => {
        return (
            <View style={styles.viewrender}
                keyboardDismissMode={true}
            >
                <TouchableOpacity
                    style={styles.infor}
                    onPress={() => {
                        setnameModal(item.name);
                        setphoneModal(item.phone);
                        setemailModal(item.email);
                        setfacebookModal(item.facebook);
                        setShowChooseModal(true);
                    }}
                >
                    <View style={styles.viewimage}>
                        <Image
                            source={{ uri: item.image }}
                            style={{
                                width: 65,
                                height: 65,
                                borderRadius: 40,
                            }}
                        ></Image>
                    </View>
                    <View style={styles.viewinside}>
                        <Text style={styles.textname}>{item.name}</Text>
                        <Text style={styles.textrender}>{item.phone}</Text>
                    </View>
                </TouchableOpacity>
                </View>
        )
    }

    return (
        <View style={styles.view}>
            <View style={styles.viewheader}>
                <Text style={styles.textheader}>Friendlist</Text>
            </View>
            <View style={styles.flatlist}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderData}
                ></FlatList>
            </View>
            <View style={styles.backgroundmodal}>
                <Modal
                    visible={showChooseModal}
                    transparent
                    onRequestClose={() => setShowChooseModal(false)}
                    animationType='slide'
                    hardwareAccelerated
                >
                    <View style={styles.modalview}>
                        <View style={styles.modalbackground}>
                            <View style={styles.modalheader}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Choose</Text>
                            </View>
                            <View style={styles.buttonmodal1}>
                                <TouchableOpacity
                                    onPress={() => {changmodal()}}
                                >
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 22, marginLeft: 20 }}>Table Details</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonmodal1}>
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            Alert.alert(
                                                `Thông báo`,
                                                'Bạn chắc chắn muốn xoá?',
                                                [
                                                    {
                                                        text: 'Ok',
                                                        onPress: () => {
                                                            db.transaction((tx) => {
                                                                tx.executeSql(
                                                                    `DELETE FROM users WHERE name = ?`,
                                                                    [nameModal],
                                                                    (tx, res) => {
                                                                        let results = res.rowsAffected
                                                                        if (results > 0) {
                                                                            getData();
                                                                            console.log('Delete Success!');
                                                                            setShowChooseModal(false);
                                                                        }
                                                                    }
                                                                )
                                                            })
                                                        }
                                                    },
                                                    {
                                                        text: 'Cancel',
                                                        onPress: () => { navigation.navigate('viewall') }
                                                    }
                                                ],
                                                { cancelable: true }
                                            )
                                        }
                                    }
                                >
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 22, marginLeft: 20 }}>Delete</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonmodal2}>
                                <TouchableOpacity
                                    onPress={() => setShowChooseModal(false)}
                                >
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 22, marginLeft: 20 }}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={showDetailsModal}
                    transparent
                    onRequestClose={() =>
                        setshowDetailsModal(false)
                    }
                    animationType='slide'
                    hardwareAccelerated
                >
                    <View style={styles.modalview2}>
                        <View style={styles.modalbackground2}>
                            <View style={styles.modalheader2}>
                                <View style={{ width: '80%', justifyContent: 'center', paddingLeft: 35 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', paddingTop: 10 }}>Thông Tin Chi Tiết</Text>
                                </View>
                                <View style={{ paddingLeft: 32, paddingBottom: 16 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setshowDetailsModal(false);
                                        }}
                                    >
                                        <View>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>X</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.modalinside}>
                                <Text style={{ marginVertical: 15, fontSize: 15 }}>Name: {nameModal}</Text>
                                <Text style={{ marginVertical: 15, fontSize: 15 }}>Phone: {phoneModal}</Text>
                                <Text style={{ marginVertical: 15, fontSize: 15 }}>Email: {emailModal}</Text>
                                <Text style={{ marginVertical: 15, fontSize: 15 }}>Facebook: {facebookModal}</Text>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f47564',
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
    viewrender: {
        flexDirection: 'row',
        borderColor: '#111',
        shadowColor: '#696969',
        shadowRadius: 50,
        elevation: 9,
        borderRadius: 10,
        paddingVertical: 30,
        marginBottom: 10,
    },
    infor: {
        width: '95%',
        flexDirection: 'row',
    },
    viewimage: {
        paddingLeft: 15,
        justifyContent: 'center',
    },
    viewinside: {
        justifyContent: 'center',
        marginLeft: 10
    },
    flatlist: {
        height: '80%',
        width: '89%',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 30
    },
    textname: {
        paddingHorizontal: 10,
        paddingTop: 5,
        fontSize: 18,
        color: '#f47564'
    },
    textrender: {
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#9e9e9e'
    },
    outside: {
        marginVertical: 50
    },
    viewheader: {
        height: '10%',
        backgroundColor: '#f47564',
        justifyContent: 'center',
        paddingTop: 35

    },
    textheader: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    touch: {
        flexDirection: 'row',
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
    },
    modalview2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalbackground2: {
        width: 300,
        height: 300,
        backgroundColor: '#f47564',
        flexDirection: 'column',
        borderRadius: 20,
    },
    modalheader2: {
        width: '100%',
        height: '15%',
        paddingLeft: 20,
        flexDirection: 'row'
    },
    modalinside:{
        width: '90%',
        height: '78%',
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginLeft: 14,
        marginTop: 10,
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 10
    }
})


export default ViewAll;
