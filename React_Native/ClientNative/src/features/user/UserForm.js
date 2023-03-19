import React, { useCallback, useState, useEffect, useRef } from "react"
import { useDispatch } from 'react-redux'
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

import { create } from './userSlice';

const windowWidth = Dimensions.get('window').width;

export default function UserForm() {

    const dispatch = useDispatch()
    const inputRef = useRef(null)

    const [user, setUser] = useState({
        name: '',
        phone: ''
    });

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const handleSubmit = useCallback(() => {
        dispatch(create(user.name, user.phone))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])

    return (
        <View>
            <View>
                <TextInput
                    style={styles.form}
                    placeholderTextColor= "#85b35a"
                    placeholder="insert new name"
                    onChangeText={name => setUser({ ...user, name })}
                    defaultValue={user.name.toLocaleLowerCase()}
                    ref={inputRef}
                />

                <TextInput
                    style={styles.form}
                    placeholderTextColor="#85b35a"
                    placeholder="insert new number"
                    onChangeText={phone => setUser({ ...user, phone })}
                    defaultValue={user.phone.toLocaleLowerCase()}
                />
            </View>
            <View style={{ marginTop: 5 }}>
                <TouchableOpacity style={{
                    height: 30,
                    width: '100%',
                    backgroundColor: user.name.length > 0 || user.phone.length > 0 ? '#85b35a' : '#ffffff', borderRadius: 5,
                    justifyContent: 'center',
                    elevation: 2,
                }} onPress={handleSubmit}>
                    <Text style={{
                        textAlign: 'center',
                        color: user.name.length > 0 || user.phone.length > 0 ? '#ffffff' : '#85b35a',
                        fontSize: 19,
                        letterSpacing: 1,
                        fontWeight: 'bold',
                    }}>save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        height: 44,
        width: '100%',
        marginTop: 5,
        padding: 10,
        elevation: 2,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        color: '#173e07'
    },
});