import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetNewPassword } from './../../actions/authActions';
import PropTypes from 'prop-types';
import SplitText from 'react-pose-text';
import { NavLink, Button } from 'reactstrap';

const charPoses = {
    exit: { opacity: 0, y: 20 },
    enter: {
        opacity: 1,
        y: 0,
        delay: ({ charIndex }) => charIndex * 30
    }
};

class resetPassword extends Component {

    constructor(props) {

        super(props);
        this.state = {
            password: null,
            confirmPassword: null,
            successMesage: null,
            loginLink: false
        }

        this.onChange = this.onChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    static propTypes = {
        resetNewPassword: PropTypes.func.isRequired,
        resetData: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {

        const { resetData } = this.props;

        if (resetData !== prevProps.resetData) {
            if (resetData.passwordReset === true) {
                this.setState({ successMesage: resetData.message, loginLink: true })
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitData() {
        const { password, confirmPassword } = this.state;

        const data = {
            password: password,
            confirmPassword: confirmPassword
        }

        this.props.resetNewPassword(data);
    }

    render() {

        return (

            <div>
                <div className="login-background">
                    <div className="left-side">
                        <div className="top-logo-section">
                            <img alt="" src="images/white-logo-tiny.png" />
                        </div>
                        <div className="heading-text">
                            WHAT WILL YOU BUILD TODAY
			</div>
                    </div>
                    <div className="right-side">
                        <div className="div-one">
                            <div className="div-two">
                                <div className="login-form">
                                    <div className="form-group">
                                        <div className="login-logo">
                                            <img alt="" src="images/main-logo.png" />
                                        </div>
                                        <form className="form">
                                            <div className="email-message">

                                            </div>
                                            <div className="input-form">
                                                <div className="label">Password</div>
                                                <div className="input-field">
                                                    <input name="password" onChange={this.onChange} className="form-control" type="password" />
                                                </div>
                                            </div>
                                            <div className="input-form">
                                                <div className="label">Confirm Password</div>
                                                <div className="input-field">
                                                    <input name="confirmPassword" onChange={this.onChange} className="form-control" type="password" />
                                                </div>
                                            </div>

                                        </form>

                                        <Button color="primary" block onClick={this.submitData} >
                                            Submit
											</Button>

                                        {
                                            this.state.successMesage ?
                                                (
                                                    <div>
                                                        <div style={{ marginTop: 20 }} >
                                                            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
                                                                {this.state.successMesage}
                                                            </SplitText>
                                                        </div>

                                                        <div style={{ textAlign: 'center', marginTop: 10 }} >
                                                            <NavLink href="/login" ><u>Go back to login page</u></NavLink>
                                                        </div>
                                                    </div>
                                                ) : null
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

const mapStateToProps = state => ({
    resetData: state.auth.data
})

export default connect(mapStateToProps, { resetNewPassword })(resetPassword);