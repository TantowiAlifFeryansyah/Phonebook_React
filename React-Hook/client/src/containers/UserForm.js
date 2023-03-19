import React, { useCallback, useState } from "react"
import { addUser, searchUser, resetQuery } from "../actions/users"
import { useDispatch } from 'react-redux'


export default function UserForm(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: '',
        phone: ''
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value,
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        dispatch(addUser(user.name,  user.phone ))
        setUser({ name: '', phone: '' })
    }, [dispatch,user])

    const handleSearch = useCallback((event) => {
        event.preventDefault()
        dispatch(searchUser({ name: user.name, phone: user.phone }))
    }, [dispatch, user])

    const cancelSearch = useCallback((event) => {
        event.preventDefault()
        dispatch(resetQuery())
        setUser({ name: '', phone: '' })
    }, [dispatch])

    return (
        <form onSubmit={props.submitLabel ? handleSearch : handleSubmit}>
            <div className="row g-1 align-items-center">
                <div className="col-auto">
                    <label
                        htmlFor="name"
                        className="col-form-label">
                        <strong>Name</strong>
                    </label>
                </div>
                <div className="col-auto">
                    <input
                        type="teks"
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleInputChange}
                        value={user.name}
                    />
                </div>

                <div className="col-auto">
                    <label
                        htmlFor="phone"
                        className="col-form-label">
                        <strong>Phone</strong>
                    </label>
                </div>
                <div className="col-auto">
                    <input
                        type="teks"
                        id="phone"
                        name="phone"
                        className="form-control"
                        onChange={handleInputChange}
                        value={user.phone}
                    />
                </div>

                <div className="col-auto">
                    <button type="submit" className="btn btn-success" >
                        {props.submitLabel !== "search" &&
                            <i className="fa-regular fa-circle-check"></i>
                        }
                        {props.submitLabel === "search" &&
                            <i className="fa-solid fa-magnifying-glass"></i>
                        }
                        &nbsp;
                        {props.submitLabel || "save"} </button>
                    &nbsp;
                    {props.submitLabel !== "search" &&
                        <button type="submit"
                            onClick={props.cancel}
                            className="btn btn-warning"
                            style={{ color: "white" }}>
                            <i className="fa-solid fa-ban"></i>
                            &nbsp;
                            cancel</button>
                    }
                    {props.submitLabel === "search" &&
                        <button type="submit"
                            onClick={cancelSearch}
                            className="btn btn-warning"
                            style={{ color: "white" }}>
                            <i className="fa-solid fa-ban"></i>
                            &nbsp;
                            reset</button>
                    }

                </div>
            </div>
        </form>
    )
}