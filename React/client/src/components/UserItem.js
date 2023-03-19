import React, { Component, Fragment } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default class UserItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.user.name,
            phone: props.user.phone,
            isEdit: false,
            showHide: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const phone = target.phone
        this.setState({
            [name]: value,
            [phone]: value
        });
    }

    handleEdit = () => {
        this.setState({
            isEdit: true
        });
    }

    handleCancel = () => {
        this.setState({
            isEdit: false
        });
    }

    saveEdit = () => {
        this.props.update({ id: this.props.user.id, name: this.state.name, phone: this.state.phone })
        this.setState({
            isEdit: false
        });
    }

    handleModalShowHide() {
        this.setState({
            showHide: true
        })
    }

    cancelHandleModalShowHide() {
        this.setState({
            showHide: false
        })
    }

    render() {
        return (
            <Fragment>
                <tr>
                    <td>{this.props.no}</td>
                    <td>
                        {this.state.isEdit ?
                            <input
                                type="teks"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                            :
                            this.state.name
                        }
                    </td>

                    <td>
                        {this.state.isEdit ?
                            <input
                                type="teks"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                            :
                            this.state.phone
                        }
                    </td>

                    {this.props.user.sent ?
                        this.state.isEdit ?
                            <td>
                                <button type="button"
                                    className="btn btn-primary"
                                    onClick={this.saveEdit}>
                                    <i class="fa-solid fa-floppy-disk"></i>
                                    &nbsp;
                                    save
                                </button>
                                &nbsp;
                                <button type="button"
                                    className="btn btn-warning"
                                    onClick={this.handleCancel}
                                    style={{ color: "white" }}>
                                    <i class="fa-solid fa-ban"></i>
                                    &nbsp;
                                    cancel
                                </button>
                            </td>
                            :
                            <td>
                                <button type="button"
                                    className="btn btn-success"
                                    onClick={this.handleEdit}>
                                    <FontAwesomeIcon icon={faPen} />
                                    &nbsp;
                                    edit
                                </button>
                                &nbsp;
                                <button type="button"
                                    className="btn btn-danger"
                                    onClick={() => this.handleModalShowHide()}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                    &nbsp;
                                    delete
                                </button>
                            </td>
                        :
                        <td>
                            <button type="button"
                                className="btn btn-warning"
                                onClick={this.props.resend}
                                style={{ color: "white" }}>
                                resend
                            </button>
                        </td>
                    }
                </tr>

                <Modal show={this.state.showHide}>
                    <Modal.Header >
                        <Modal.Title>Deleted Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure, you want delete it</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.cancelHandleModalShowHide()}>
                            No
                        </Button>
                        <Button variant="primary" onClick={this.props.remove}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        )
    }
}