import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyOtp } from './../../actions/authActions';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

class otpVerification extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: props.location && props.location.state ? props.location.state.email : '',
            errorMessage: null,
            otp: null,
            loader: null
        }

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        verifyOtp: PropTypes.func.isRequired,
        isError: PropTypes.object.isRequired,
        isSuccess: PropTypes.object.isRequired,
        loading: PropTypes.bool
    }

    componentDidUpdate(prevProps) {

        const { isError, isSuccess } = this.props;

        if (isError !== prevProps.isError) {
            if (isError.otpSuccess === false) {
                this.setState({ errorMessage: isError.message });
            }
        }

        if (isSuccess !== prevProps.isSuccess) {
            if (isSuccess.otpSuccess === true) {

                this.props.history.push({
                    pathname: '/resetPassword',
                    state: { email: this.state.email }
                })
            }
        }
    }

    onChange(e) {

        const { errorMessage } = this.state;

        if (errorMessage !== null) {
            this.setState({ errorMessage: '' })
        }

        this.setState({ [e.target.name]: e.target.value })
    }

    onClick() {

        const { otp } = this.state;

        const data = { otp: otp }

        this.props.verifyOtp(data);

    }

    render() {

        return (

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

                                    <div className="form">

                                        <div className="email-message">
                                            An otp message has been sent to <span>{this.state.email}</span>
                                        </div>
                                        <div className="input-form">
                                            <div className="label">Enter Your OTP</div>
                                            <div className="input-field">
                                                <input onChange={this.onChange} name="otp" className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="input-form">
                                            <Button color="primary" block onClick={this.onClick} >Submit</Button>
                                        </div>
                                        {
                                            this.state.errorMessage ? (<p style={{ color: 'red' }}>{this.state.errorMessage}</p>) : null
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
    isError: state.auth.err,
    isSuccess: state.auth.data,
    loading: state.auth.isLoading
})

export default connect(mapStateToProps, { verifyOtp })(otpVerification);