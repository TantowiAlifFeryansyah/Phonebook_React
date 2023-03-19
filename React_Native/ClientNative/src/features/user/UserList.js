import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'

import UserItem from "../../components/UserItem";

import {
    readUserAsync,
    selectUser,
    deleteUserAsync,
    createUserAsync,
    updateUserAsync,
    loadUserAsync
} from './userSlice';

export default function UserList() {

    const users = useSelector(selectUser)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readUserAsync())
    }, [dispatch]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}>
            <View style={{ 
                flex: 1 ,
                maxHeight: 637,
                minHeight: 500,
                justifyContent: 'center'
                }}>
                <FlatList
                    data={users}
                    initialNumToRender={7}
                    renderItem={({ item, index }) => (
                        <UserItem
                            key={item.id}
                            // no={item.id}
                            no={index + 1}
                            data={item}
                            sent={item.sent}
                            remove={() => dispatch(deleteUserAsync(item.id))}
                            resend={() => dispatch(createUserAsync({ id: item.id, name: item.name, phone: item.phone }))}
                            update={(name, phone) => dispatch(updateUserAsync({ id: item.id, name, phone }))}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => dispatch(loadUserAsync())}
                    style={{
                        maxHeight: 580,
                        borderColor: 'red',
                        
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    )
}