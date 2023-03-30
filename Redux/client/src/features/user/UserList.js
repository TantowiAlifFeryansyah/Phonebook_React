import React, { useCallback, useEffect } from "react";
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


export default function UserList(props) {

    const users = useSelector(selectUser)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readUserAsync())
    }, [dispatch]);

    const scrolling = useCallback((event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            dispatch(loadUserAsync())
        }
    }, [dispatch])

    return (
        <div onScroll={scrolling} style={{ overflowY: "scroll", height: 315 }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th> No </th>
                        <th> Name </th>
                        <th> Phone </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <UserItem
                            key={user.id}
                            no={index + 1}
                            data={user}
                            sent={user.sent}
                            remove={() => dispatch(deleteUserAsync(user.id))}
                            resend={() => dispatch(createUserAsync({id: user.id, name: user.name, phone: user.phone}))}
                            update={(name, phone) => dispatch(updateUserAsync({id: user.id, name, phone}))}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
