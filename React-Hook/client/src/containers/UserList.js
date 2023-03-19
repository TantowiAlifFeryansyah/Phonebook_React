import React, { useCallback, useEffect } from "react";
import { loadUser, removeUser, resendUser, updateUser, loadMore } from "../actions/users";
import UserItem from "../components/UserItem";
import { useSelector, useDispatch } from 'react-redux'


export default function UserList(props) {

    const users = useSelector((state) => state.users.data)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch]);

    const scrolling = useCallback((event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            dispatch(loadMore())
        }
    }, [dispatch])

    return (
        <div onScroll={scrolling} style={{ overflowY: "scroll", height: 200 }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Name </th>
                        <th> Phones </th>
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
                            remove={() => dispatch(removeUser(user.id))}
                            resend={() => dispatch(resendUser(user))}
                            update={(name, phone) => dispatch(updateUser(user.id, name, phone))}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
