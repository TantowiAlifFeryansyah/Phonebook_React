import React, { useCallback, useState } from "react"
import UserForm from "./UserForm";
import UserList from "./UserList";
import { useDispatch } from 'react-redux'

export default function User(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        isAdd: false,
    });

    const handleAdd = useCallback((event) => {
        event.preventDefault()
        setUser({
            isAdd: true
        });
    }, [dispatch])

    const handleCancel = useCallback((event) => {
        event.preventDefault()
        setUser({
            isAdd: false
        });
    }, [dispatch])

    return (
        <div className="container mt-4">
            <div className="card shadow mb-4">
                <div className="card-header pt-4 pb-3">
                    <center>
                        <h2>Phone Book Apps</h2>
                    </center>
                </div>
            </div>

            {user.isAdd ?
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold">Adding Form</h6>
                    </div>

                    <div className="card-body">
                        <UserForm
                            cancel={handleCancel}
                        />
                    </div>
                </div>
                :
                <div className="mb-4">
                    <button type="submit"
                        className="btn btn-primary"
                        onClick={handleAdd}>
                        <i className="fa-solid fa-plus"></i>
                        &nbsp;
                        add
                    </button>
                </div>
            }

            <div className="card shadow mb-5">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold">Search Form</h6>
                </div>
                <div className="card-body">
                    <UserForm
                        submitLabel="search"
                    />
                </div>
            </div>

            <UserList />

        </div>
    )
} 