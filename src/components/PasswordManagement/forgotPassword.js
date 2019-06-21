import React, { Component } from 'react'
import { connect } from 'react-redux';
import { forgotThePassword } from './../../actions/authActions';
import PropTypes from 'prop-types';
import logo from './../../material/images/logo.png';
import { Button } from 'reactstrap';

class forgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: props.location && props.location.state ? props.location.state.email : '',
            successMessage: null,
            errorMessage: null,
            dataLoading: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        forgotThePassword: PropTypes.func.isRequired,
        otpResp: PropTypes.object.isRequired,
        errData: PropTypes.object.isRequired,
        loading: PropTypes.bool
    }

    componentDidUpdate(prevProps) {

        const { otpResp, errData, loading } = this.props;

        if (loading !== prevProps.loading) {
            if (loading === true) {
                this.setState({ dataLoading: true })
            }
        }

        if (errData !== prevProps.errData) {

            this.setState({ dataLoading: false })

            if (errData.message.success === false) {
                this.setState({ errorMessage: errData.message.message })
            }
        }

        if (otpResp.otpSent !== prevProps.otpResp.otpSent) {

            if (otpResp.otpSent === true) {

                this.setState({ dataLoading: false });

                this.props.history.push({
                    pathname: '/verifyOtp',
                    state: { email: this.state.email }
                })

            } else {
                alert('Error');
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit() {

        const { email } = this.state;

        const useremail = { email: email }

        this.props.forgotThePassword(useremail);

    }

    render() {

        return (
            <div>
                {
                    this.state.dataLoading ? (
                        <div style={{
                            textAlign: 'center',
                            marginTop: 250
                        }}>
                            <img src={logo} classNameName="rotate" alt="Loader" />
                        </div>
                    ) : <div className="login-background">
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
                                                    <div className="input-form">
                                                        <div className="label">Enter Your Email</div>
                                                        <div className="input-field">
                                                            <input name="email" onChange={this.onChange} className="form-control" type="email" value={this.state.email} />
                                                        </div>
                                                    </div>
                                                    <div className="input-form">
                                                        <Button color="primary" block onClick={this.onSubmit}>Submit</Button>
                                                    </div>

                                                    {
                                                        this.state.errorMessage ? (<p style={{ color: 'red', marginTop: 20 }}>{this.state.errorMessage}</p>) : null
                                                    }

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </div>
        )
    }
}



const mapStateToProps = state => ({
    otpResp: state.auth.data,
    errData: state.error.err,
    loading: state.auth.isLoading
})

export default connect(mapStateToProps, { forgotThePassword })(forgotPassword);
