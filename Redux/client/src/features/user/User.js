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
        <div className="container mt-5">
            <div class="card">
                <div className=" shadow mb-4">
                    <div className="card-header pt-4 pb-3" style={{ backgroundColor: '#e9f3e0' }}>
                        <h2 style={{ color: '#173e07', fontWeight: 700, fontSize: 35 }}>PhoneBook</h2>
                    </div>
                </div>

                <div className="card-body">
                    {user.isAdd ?
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" style={{ backgroundColor: '#e9f3e0' }}>
                                <h6 className="m-0 font-weight-bold" style={{ color: '#173e07' }}>Adding Form</h6>
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
                                onClick={handleAdd}
                                style={{ backgroundColor: '#173e07', borderWidth: 0 }}>
                                <i className="fa-solid fa-plus"></i>
                                &nbsp;
                                add
                            </button>
                        </div>
                    }

                    <div className="card shadow mb-5">
                        <div className="card-header py-3" style={{ backgroundColor: '#e9f3e0' }}>
                            <h6 className="m-0 font-weight-bold" style={{ color: '#173e07' }}>Search Form</h6>
                        </div>
                        <div className="card-body">
                            <UserForm
                                submitLabel="search"
                            />
                        </div>
                    </div>

                    <UserList />
                </div>

                <div class='card-footer py-3' style={{ backgroundColor: '#e9f3e0' }}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <i class="fa-regular fa-copyright"></i>
                    <h6>2023 Phonebook - by</h6>
                    <h6>Tantowi Alif Feryansyah</h6>
                    </div>
                </div>
            </div>
        </div>
    )
} 