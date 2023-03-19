import React, { Component } from "react"
import { addUser, searchUser, resetQuery } from "../actions/users"
import { connect } from 'react-redux'


class UserForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.add({ name: this.state.name, phone: this.state.phone })
        this.setState({ name: '', phone: '' })
    }

    handleSearch = (event) => {
        event.preventDefault()
        this.props.searchDispatch({ name: this.state.name, phone: this.state.phone })
    }

    cancelSearch = (event) => {
        event.preventDefault()
        this.props.resetSearch()
        this.setState({ name: '', phone: '' })
    }

    render() {
        return (
            <form onSubmit={this.props.submitLabel ? this.handleSearch : this.handleSubmit}>
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
                            onChange={this.handleInputChange}
                            value={this.state.name}
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
                            onChange={this.handleInputChange}
                            value={this.state.phone}
                        />
                    </div>

                    <div className="col-auto">
                        <button type="submit" className="btn btn-success" >
                            {this.props.submitLabel !== "search" &&
                                <i className="fa-regular fa-circle-check"></i>
                            }
                            {this.props.submitLabel === "search" &&
                                <i className="fa-solid fa-magnifying-glass"></i>
                            }
                            &nbsp;
                            {this.props.submitLabel || "save"} </button>
                        &nbsp;
                        {this.props.submitLabel !== "search" &&
                            <button type="submit"
                                onClick={this.props.cancel}
                                className="btn btn-warning"
                                style={{ color: "white" }}>
                                <i className="fa-solid fa-ban"></i>
                                &nbsp;
                                cancel</button>
                        }
                        {this.props.submitLabel === "search" &&
                            <button type="submit"
                                onClick={this.cancelSearch}
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
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    add: ({ name, phone }) => dispatch(addUser(name, phone)),
    searchDispatch: (query) => dispatch(searchUser(query)),
    resetSearch: () => dispatch(resetQuery())
})

export default connect(
    null,
    mapDispatchToProps
)(UserForm)