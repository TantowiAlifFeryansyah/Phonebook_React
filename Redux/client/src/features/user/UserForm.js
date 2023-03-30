import React, { useCallback, useState, useEffect, useRef } from "react"

import { useDispatch } from 'react-redux'

import {
    create,
    resetSearch,
    searchUserAsync,
} from './userSlice';

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
        dispatch(create(user.name, user.phone))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])

    const handleSearch = useCallback((event) => {
        event.preventDefault()
        dispatch(searchUserAsync({ name: user.name, phone: user.phone }))
    }, [dispatch, user])

    const cancelSearch = () => {
        dispatch(resetSearch())
        setUser({ name: '', phone: '' })
    }

    return (
        <form onSubmit={
            props.submitLabel
                ? handleSearch :
                handleSubmit}>
            <div className="row g-3 align-items-center">

                <div class="col">
                    <input
                        type="teks"
                        placeholder="insert name"
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleInputChange}
                        value={user.name}
                    />
                </div>

                <div class="col">
                    <input
                        type="teks"
                        placeholder="insert number"
                        id="phone"
                        name="phone"
                        className="form-control"
                        onChange={handleInputChange}
                        value={user.phone}
                    />
                </div>

                <div className="col-auto">
                    <button type="submit" className="btn btn-success" 
                    style={{backgroundColor: '#173e07', borderWidth: 0}}>
                        {props.submitLabel !== "search" &&
                            <i className="fa-regular fa-circle-check"></i>
                        }
                        {props.submitLabel === "search" &&
                            <i className="fa-solid fa-magnifying-glass"></i>
                        }
                        &nbsp;
                        {props.submitLabel || "save"}
                    </button>
                    &nbsp;
                    {props.submitLabel !== "search" &&
                        <button type="submit"
                            onClick={props.cancel}
                            className="btn btn-warning"
                            style={{ backgroundColor: '#4a8122', borderWidth: 0, color: 'white' }}>
                            <i className="fa-solid fa-ban"></i>
                            &nbsp;
                            cancel</button>
                    }
                    {props.submitLabel === "search" &&
                        <button type="submit"
                            onClick={cancelSearch}
                            className="btn btn-warning"
                            style={{ backgroundColor: '#4a8122', borderWidth: 0, color: 'white' }}>
                            <i className="fa-solid fa-ban"></i>
                            &nbsp;
                            reset</button>
                    }

                </div>
            </div>
        </form>

    )
}