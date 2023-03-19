import React, { Component } from "react"
import UserForm from "../containers/UserForm";
import UserList from "../containers/UserList";

export default class UserBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAdd: false,
        }
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
                            submitLabel="search"
                            cancelSearch={this.cancelSearch}
                        />
                    </div>
                </div>

                <UserList />

            </div>

        )
    }
}