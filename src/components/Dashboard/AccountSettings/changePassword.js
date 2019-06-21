import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { connect } from 'react-redux';
import { setNewPassword } from './../../../actions/passwordActions';
import { logout } from './../../../actions/authActions';
import { Button, Alert } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

class changePassword extends Component {

    constructor(props) {

        let userData = JSON.parse(sessionStorage.getItem('loginState'));

        super(props);

        this.state = {
            email: userData.user.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            successMessage: null,
            errorMessage: null
        }
    }

    componentDidUpdate(prevProps) {

        const { data } = this.props;

        if (data !== prevProps.data) {
            if (data.isUpdated === true) {
                this.setState({ successMessage: data.message });
            } else {
                this.setState({ errorMessage: data.message });
            }
        }

    }

    onConfirm = (e) => {

        sessionStorage.clear('loginState');

        this.props.logout();

        this.props.history.push({
            pathname: '/login'
        })

    }

    onChangeText = (e) => {

        const { successMessage, errorMessage } = this.state;

        this.setState({ [e.target.name]: e.target.value })

        if (successMessage !== null || errorMessage !== null) {
            this.setState({
                successMessage: null,
                errorMessage: null
            })
        }
    }

    changePassword = (e) => {

        e.preventDefault();

        const { currentPassword, newPassword, confirmPassword, email } = this.state;

        const data = {
            currentPassword,
            newPassword,
            confirmPassword,
            email
        }

        this.props.setNewPassword(data);
    }

    render() {

        return (

            <div>

                <div className="main-panel">

                    <SidebarComponent propData={this.props} />

                    <div className="page-container">

                        <HeaderComponent propData={this.props} />

                        <div className="inner-panel">

                            <div className="form-group animated fadeInDown">

                                {
                                    this.state.successMessage ? (
                                        <SweetAlert success title={this.state.successMessage} onConfirm={this.onConfirm}>
                                            Please login to continue.
                                        </SweetAlert>
                                    ) : null
                                }

                                {
                                    this.state.errorMessage ? (
                                        <Alert color="danger">{this.state.errorMessage}</Alert>
                                    ) : null
                                }

                                <h4>Change Password</h4>

                                <br />

                                <form className="form">

                                    <div className="input-form">
                                        <div className="label">Current Password</div>
                                        <div className="input-field">
                                            <input onChange={this.onChangeText} className="form-control" name="currentPassword" type="password" />
                                        </div>
                                    </div>

                                    <div className="input-form">
                                        <div className="label">New Password</div>
                                        <div className="input-field">
                                            <input onChange={this.onChangeText} className="form-control" name="newPassword" type="password" />
                                        </div>
                                    </div>

                                    <div className="input-form">
                                        <div className="label">Confirm Password</div>
                                        <div className="input-field">
                                            <input onChange={this.onChangeText} className="form-control" name="confirmPassword" type="password" />
                                        </div>
                                    </div>


                                    <div className="input-form">
                                        <Button block color="warning" onClick={this.changePassword}><p style={{ color: '#fff' }}>Update</p></Button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.password.data
})

export default connect(mapStateToProps, { setNewPassword, logout })(changePassword)