import React, { Fragment, useCallback, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from "react-redux"

export default function UserItem(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: props.data.name,
        phone: props.data.phone,
        isEdit: false,
        showHide: false
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const phone = target.phone
        setUser({
            ...user,
            [name]: value,
            [phone]: value
        });
    }

    const handleEdit = useCallback((event) => {
        event.preventDefault()
        setUser({
            name: user.name,
            phone: user.phone,
            isEdit: true
        });
    }, [user])

    const handleCancel = useCallback((event) => {
        event.preventDefault()
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            isEdit: false
        });
    }, [])

    const saveEdit = useCallback((event) => {
        event.preventDefault()
        props.update(user.name, user.phone)
        setUser({
            ...user,
            name: user.name,
            phone: user.phone,
            isEdit: false
        });
    }, [dispatch, user])

    const handleModalShowHide = useCallback(() => {
        setUser({
            showHide: true
        })
    }, [])

    const cancelHandleModalShowHide = useCallback((event) => {
        event.preventDefault()
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            showHide: false
        })
    }, [dispatch, user])

    return (
        <Fragment>
            <tr>
                <td>{props.no}</td>
                <td>
                    {user.isEdit ?
                        <input
                            type="teks"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                        :
                        user.name
                    }
                </td>

                <td>
                    {user.isEdit ?
                        <input
                            type="teks"
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                        :
                        user.phone
                    }
                </td>

                {props.data.sent ?
                    user.isEdit ?
                        <td>
                            <button type="button"
                                className="btn btn-primary"
                                onClick={saveEdit}>
                                <i className="fa-solid fa-floppy-disk"></i>
                                &nbsp;
                                save
                            </button>
                            &nbsp;
                            <button type="button"
                                className="btn btn-warning"
                                onClick={handleCancel}
                                style={{ color: "white" }}>
                                <i className="fa-solid fa-ban"></i>
                                &nbsp;
                                cancel
                            </button>
                        </td>
                        :
                        <td>
                            <button type="button"
                                className="btn btn-success"
                                onClick={handleEdit}>
                                <FontAwesomeIcon icon={faPen} />
                                &nbsp;
                                edit
                            </button>
                            &nbsp;
                            <button type="button"
                                className="btn btn-danger"
                                onClick={() => handleModalShowHide()}>
                                <FontAwesomeIcon icon={faTrashCan} />
                                &nbsp;
                                delete
                            </button>
                        </td>
                    :
                    <td>
                        <button type="button"
                            className="btn btn-warning"
                            onClick={props.resend}
                            style={{ color: "white" }}>
                            resend
                        </button>
                    </td>
                }
            </tr>

            <Modal show={user.showHide}>
                <Modal.Header >
                    <Modal.Title>Deleted Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you want delete <b>{props.data.name}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelHandleModalShowHide}>
                        No
                    </Button>
                    <Button variant="primary" onClick={props.remove}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    )
}