import { useDispatch } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, ScrollView } from "react-native"
import { useCallback, useState } from "react"
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UserItem(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: props.data.name,
        phone: props.data.phone,
        isEdit: false,
        modal: false
    })

    const handleEdit = useCallback(() => {
        setUser({
            name: user.name,
            phone: user.phone,
            isEdit: true
        });
    }, [user])

    const handleCancel = useCallback(() => {
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            isEdit: false
        });
    })

    const saveEdit = useCallback(() => {
        props.update(user.name, user.phone)
        setUser({
            ...user,
            name: user.name,
            phone: user.phone,
            isEdit: false
        });
    }, [dispatch, user])

    const showModal = useCallback(() => {
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            modal: true
        });
    })

    const hideModal = useCallback(() => {
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            modal: false
        });
    })

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.cardWrapper}>
                    <View style={styles.cardList}>
                        <View style={{
                            flexDirection: 'row',
                            width: "80%",
                            alignItems: 'center',
                                }}>
                            <View style={styles.number}>
                            <Text style={styles.noText}>{props.no}</Text>
                            </View>
                            <View style={styles.icon}>
                                <Icon name="person-circle-outline" size={50} color="#173e07" />
                            </View>
                            <View style={styles.card}>
                                {user.isEdit ?
                                    <TextInput
                                        style={styles.userName}
                                        placeholderTextColor="gray"
                                        placeholder="Masukan Nama!"
                                        onChangeText={name => setUser({ ...user, name })}
                                        defaultValue={user.name}
                                        autoFocus={true}
                                    />
                                    :
                                    <View>
                                        <Text style={styles.cardTitleName}>{user.name}</Text>
                                    </View>
                                }

                                {user.isEdit ?
                                    <TextInput
                                        style={styles.userPhone}
                                        placeholderTextColor="gray"
                                        placeholder="Masukan Nomor!"
                                        onChangeText={phone => setUser({ ...user, phone })}
                                        defaultValue={user.phone}
                                    />
                                    :
                                    <View>
                                        <Text style={styles.cardTitlePhone}>{user.phone}</Text>
                                    </View>
                                }
                            </View>
                        </View>


                        <View style={styles.buttonList}>
                            {props.data.sent ? user.isEdit ?
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 5, elevation: 2 }} onPress={saveEdit}>
                                        <Icon name="save" size={30} color="#85b35a" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginHorizontal: 2, elevation: 2 }} onPress={handleCancel}>
                                        <Icon name="arrow-back-circle" size={30} color="#bdd9a0" />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={{ marginHorizontal: 5, elevation: 2 }} onPress={handleEdit}>
                                        <Icon name="create" size={30} color="#4a8122" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginHorizontal: 2, elevation: 2 }} onPress={showModal}>
                                        <Icon name="close-circle" size={30} color="#85b35a" />
                                    </TouchableOpacity>
                                </View>
                                :
                                <TouchableOpacity style={{ marginHorizontal: 2, elevation: 2 }} onPress={props.resend}>
                                    <Icon name="refresh-circle" size={30} color="#4a8122" />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View>
                <Modal isVisible={user.modal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalListIcon}>
                            <Icon name="alert-circle" size={80} color="#173e07"
                                style={styles.modalIcon} />
                        </View>

                        <Text style={styles.titleModal}>Deleted Confirmation</Text>
                        <Text style={{ textAlign: 'center', fontSize: 17, color: 'gray' }}>
                            Are you sure you want delete it?
                        </Text>
                        <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold', color: '#173e07' }}>
                            " {props.data.name} "
                        </Text>

                        <View style={styles.buttonModal}>
                            <TouchableOpacity style={styles.modalNo} onPress={hideModal}>
                                <Text style={{ color: '#ffffff' }}> No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalYes} onPress={props.remove}>
                                <Text style={{ color: '#ffffff' }}> Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: windowWidth * 0.02,
        // marginVertical: windowHeight * 0.01,
    },
    cardWrapper: {
        borderBottomWidth: 1.5,
        borderColor: '#173e07'
    },
    cardList: {
        borderColor: 'red',
        flexDirection: 'row',
        paddingBottom: 3,
        paddingTop: 0,
        width: '100%'
    },
    number: {
        width: 25,
        alignItems: 'center'
    },
    noText: {
        paddingVertical: 10,
        fontSize: 11,
        color: '#173e07',
        fontWeight: 'bold',
    },
    icon: {
        width: 55,
        alignContent: 'center'
    },
    card: {
        paddingBottom: 5,
        paddingTop: 5,
        justifyContent: 'flex-start',
        borderColor: "red",
        width: '73%',
    },
    userName: {
        height: 25,
        width: "100%",
        marginTop: -5,
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 2,
        paddingBottom: 2,
        color: '#4a8122'
    },
    userPhone: {
        height: 25,
        paddingVertical: 5,
        width: "100%",
        marginBottom: -5,
        fontSize: 15,
        paddingTop: 2,
        paddingBottom: 2,
        color: '#4a8122'
    },
    cardTitleName: {
        color: '#173e07',
        fontWeight: '700',
        fontSize: 18
    },
    cardTitlePhone: {
        color: 'gray',
        fontWeight: '500',
        fontSize: 15,
    },
    buttonList: {
        borderColor: "blue",
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    modalListIcon: {
        alignItems: 'center',
        borderColor: '#ffffff',
        bottom: 85
    },
    modalIcon: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 85,
        paddingHorizontal: 5,
        borderRadius: 50,
        zIndex: 1
    },
    titleModal: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#173e07',
        textAlign: 'center',
        marginTop: 0
    },
    buttonModal: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
    modalNo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#85b35a',
        paddingVertical: 5,
        borderRadius: 50,
        elevation: 3,
        width: '20%',
        marginHorizontal: 7
    },
    modalYes: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4a8122',
        paddingVertical: 5,
        borderRadius: 50,
        elevation: 3,
        width: '20%',
        marginHorizontal: 7
    },
});