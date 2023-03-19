import React, { useCallback, useState, useEffect, useRef } from "react"

import { useDispatch } from 'react-redux'
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";

import { resetSearch, searchUserAsync } from './userSlice';

export default function UserSearch() {

    const dispatch = useDispatch()
    const inputRef = useRef(null)

    const [user, setUser] = useState({
        name: '',
        phone: ''
    });

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const handleSearch = useCallback(() => {
        dispatch(searchUserAsync({ name: user.name, phone: user.phone }))
    }, [dispatch, user])

    const cancelSearch = useCallback(() => {
        dispatch(resetSearch())
        setUser({ name: '', phone: '' })
    }, [dispatch])

    return (
        <View>
            <View>
                <TextInput
                    style={styles.form}
                    placeholderTextColor="#85b35a"
                    placeholder="insert name"
                    onChangeText={name => setUser({ ...user, name })}
                    defaultValue={user.name.toLocaleLowerCase()}
                    ref={inputRef}
                />

                <TextInput
                    style={styles.form}
                    placeholderTextColor="#85b35a"
                    placeholder="insert number"
                    onChangeText={phone => setUser({ ...user, phone })}
                    defaultValue={user.phone.toLocaleLowerCase()}
                />
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={{
                    height: 30,
                    width: '49%',
                    backgroundColor: user.name.length > 0 || user.phone.length > 0 ? '#85b35a' : '#ffffff',
                    borderRadius: 5,
                    justifyContent: 'center',
                    elevation: 2,

                }} onPress={handleSearch}>
                    <Text style={{
                        textAlign: 'center',
                        color: user.name.length > 0 || user.phone.length > 0 ? '#ffffff' : '#85b35a',
                        fontSize: 19,
                        letterSpacing: 1,
                        fontWeight: 'bold',
                    }}>search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: '49%',
                    backgroundColor: user.name.length > 0 || user.phone.length > 0 ? '#85b35a' : '#ffffff',
                    borderRadius: 5,
                    justifyContent: 'center',
                    elevation: 2,
                }} onPress={cancelSearch}>
                    <Text style={{
                        textAlign: 'center',
                        color: user.name.length > 0 || user.phone.length > 0 ? '#ffffff' : '#85b35a',
                        fontSize: 19,
                        letterSpacing: 1,
                        fontWeight: 'bold',
                    }}>reset</Text>
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
        color: '#173e07',
    },
    row: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});