import React, { Component } from "react";
import { loadUser, removeUser, resendUser, updateUser, loadMore } from "../actions/users";
import UserItem from "../components/UserItem";
import { connect } from 'react-redux'


class UserList extends Component {

    componentDidMount() {
        this.props.load()
    }

    scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            this.props.loadMore()
        }
    }

    render() {
        return (
            <div onScroll={this.scrolling} style={{ overflowY: "scroll", height: 200 }}>
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
                        {this.props.users.map((user, index) => (
                            <UserItem
                                key={user.id}
                                no={index + 1}
                                data={user}
                                sent={user.sent}
                                remove={() => this.props.remove(user.id)}
                                resend={() => this.props.resend(user)}
                                update={(name, phone) => this.props.update(user.id, name, phone)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users.data
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    load: () => dispatch(loadUser()),
    remove: (id) => dispatch(removeUser(id)),
    resend: (id, name, phone) => dispatch(resendUser(id, name, phone)),
    update: (id, name, phone) => dispatch(updateUser(id, name, phone)),
    loadMore: () => dispatch(loadMore())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)