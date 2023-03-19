import React, { Component } from "react"
import UserForm from "./UserForm";
import UserList from "./UserList";

export default class UserBox extends Component {

    constructor(props) {
        super(props)
        this.params = {
            page: 1,
            name: '',
            phone: ''
        }
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser = () => {
        fetch(`http://localhost:3000/users?${new URLSearchParams(this.params)}`)
            .then((response) => response.json())
            .then(data => {
                this.setState(state => ({
                    users: [...(this.params.page === 1 ? [] : state.users), ...data.data.users.map(item => {
                        item.sent = true
                        return item
                    })]
                }))
                this.params.pages = data.data.pages
            })
    }

    addUser = ({ name, phone }) => {
        const id = Date.now()
        this.setState(function (state, props) {
            return {
                users: [
                    ...state.users,
                    {
                        id,
                        name,
                        phone,
                        sent: true
                    }
                ]
            }
        })
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState(function (state, props) {
                    return {
                        users: state.users.map(item => {
                            if (item.id === id) {
                                return {
                                    id: data.data.id,
                                    name: data.data.name,
                                    phone: data.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })
                    }
                })
            })
            .catch((error) => {
                this.setState(function (state, props) {
                    return {
                        users: state.users.map(item => {
                            if (item.id === id) {
                                return { ...item, sent: false }
                            }
                            return item
                        })
                    }
                })
            });
    }

    updateUser = ({ id, name, phone }) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState(function (state) {
                    return {
                        users: state.users.map(item => {
                            if (item.id === id) {
                                return {
                                    id: data.data.id,
                                    name: data.data.name,
                                    phone: data.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })
                    }
                })
            })
    }

    removeUser = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState(function (state, props) {
                    return {
                        users: state.users.filter(item => item.id !== id)
                    }
                })
            })
    }

    resendUser = ({ id, name, phone }) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState(function (state, props) {
                    return {
                        users: state.users.map(item => {
                            if (item.id === id) {
                                return {
                                    id: data.data.id,
                                    name: data.data.name,
                                    phone: data.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })
                    }
                })

            })
            .catch((error) => {
                console.log('gagal resend', error);
            });
    }

    handleAdd = () => {
        this.setState({
            isAdd: true
        });
    }

    handleCancel = () => {
        this.setState({
            isAdd: false
        });
    }

    cancelSearch = () => {
        this.params = {
            page: 1,
            name: '',
            phone: ''
        }
        this.loadUser()
    }

    search = (query = {}) => {
        this.params = { ...this.params, ...query, page:1 }
        this.loadUser()
    }

    loadMore = () => {
        if (this.params.page <= this.params.pages) {
            this.params = {
                ...this.params,
                page: this.params.page + 1
            }
            this.loadUser()
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="card shadow mb-4">
                    <div className="card-header pt-4 pb-3">
                        <center>
                            <h2>Phone Book Apps</h2>
                        </center>
                    </div>
                </div>

                {this.state.isAdd ?
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold">Adding Form</h6>
                        </div>

                        <div className="card-body">
                            <UserForm
                                add={this.addUser}
                                cancel={this.handleCancel}
                            />
                        </div>
                    </div>
                    :
                    <div className="mb-4">
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={this.handleAdd}>
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
                            submit={this.search}
                            submitLabel="search"
                            cancelSearch={this.cancelSearch}
                        />
                    </div>
                </div>

                <UserList
                    data={this.state.users}
                    remove={this.removeUser}
                    resend={this.resendUser}
                    update={this.updateUser}
                    loadMore={this.loadMore}
                />

            </div>

        )
    }
}