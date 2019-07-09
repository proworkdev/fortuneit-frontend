import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout, confirmOTP, resendOTP } from './../../actions/authActions';
import { returnErrors } from './../../actions/errorActions';
import PropTypes from 'prop-types';
import { Button, NavLink } from 'reactstrap';

class emailConfirmation extends Component {

  // To initialize the attributes to be used throughout the component.
  constructor(props) {

    // To make *this* keyword work inside the constructor.
    super(props);

    // Setting up initial states for the component.
    this.state = {

      // Checking if the email is receving any value in its props from its parent component.
      email: props.location && props.location.state ? props.location.state.email : '',
      otp: null,
      successMessage: null,
      resendMessage: true,
      errorMessage: null
    }

    // Binding the methods that are used in this component.
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.resendOTP = this.resendOTP.bind(this);
  }

  // Proptypes for validating functions/objects & boolena values.
  static propTypes = {
    logout: PropTypes.func.isRequired,
    confirmOTP: PropTypes.func.isRequired,
    resendOTP: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
    data: PropTypes.object,
    errData: PropTypes.object,
    resendData: PropTypes.object,
    isEmailVerified: PropTypes.bool,
    invalidError: PropTypes.bool,
  }

  // CDU Lifecycle method to look for prop changes and render the DOM accordingly.
  componentDidUpdate(prevProps) {

    // Destructuring to fetch prop values for the component. These values are mostly
    // coming from the reducers.
    const { data, isEmailVerified, errData, resendData } = this.props;

    // Checking for the change in resentOtp prop.
    if (resendData.resentOtp !== prevProps.resendData.resentOtp) {

      // Checking if the OTP has been sent successfully.
      if (resendData.resentOtp === true) {
        this.setState({ successMessage: resendData.message, errorMessage: null });
      }
    }

    // Checking for the change in otpSuccess prop.
    if (errData.otpSuccess !== prevProps.errData.otpSuccess) {

      // Checking if the OTP auth has failed. 
      if (errData.otpSuccess === false) {
        this.setState({ errorMessage: errData.message, successMessage: null });
      }
    }

    // Checking for the change in isEmailVerified prop.
    if (isEmailVerified !== prevProps.isEmailVerified) {

      // Checking if the email(OTP) has been been verified by the server.
      if (isEmailVerified === true) {
        this.setState({ successMessage: data.message, errorMessage: null, resendMessage: false });
        this.props.history.push({
          pathname: '/businessInfo',
          state: { username: this.state.email }
        })
      }
    }
  }

  // Event listener to detech change in input fields.
  onChange(e) {

    // Used an array to check for change in fields altogether.
    this.setState({ [e.target.name]: e.target.value });
  }

  // On submitting an OTP, this method will run.
  onSubmit(e) {

    e.preventDefault();

    const { otp } = this.state;

    const data = { otp };

    // Passing OTP as parameter for verification.
    // This will take OTP to the authActions's confirmOTP method.
    this.props.confirmOTP(data);

  }


  // For resending OTP, this method will work.
  resendOTP() {

    const { email } = this.state;

    const data = { email };

    // Passing email as parameter in order for thr server to know which email
    // it has to send OTP to again. authAction's resendOTP method would be hit up.
    this.props.resendOTP(data);

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
                      A verification code has been sent to <span>{this.state.email}</span>
                    </div>

                    <div className="input-form">
                      <div className="label">Verification Code</div>
                      <div className="input-field">
                        <input onChange={this.onChange} name="otp" className="form-control" type="text" />
                        {
                          this.state.errorMessage ? (
                            <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                          ) : null
                        }
                      </div>
                    </div>
                    <div className="input-form">
                      <Button block color="primary" onClick={this.onSubmit} >Submit</Button>
                    </div>
                    {
                      this.state.successMessage ? (
                        <p style={{ color: 'green' }} >{this.state.successMessage}</p>
                      ) : null
                    }

                  </div>
                </div>
                {
                  this.state.resendMessage ? (
                    <div style={{ marginTop: 20 }} >
                      <p>Didn't receive an OTP yet? Click <Button size={'sm'} onClick={this.resendOTP} >here</Button> to resend it.</p>
                    </div>
                  ) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Using mapStateToProps method to import state of respective reducers,
// so that we can import & use them in our component.
const mapStateToProps = state => ({
  data: state.auth.data,
  isEmailVerified: state.auth.isEmailVerified,
  errData: state.error.message,
  resendData: state.auth.data
})

// Connect function is used to connect our components to the redux.
export default connect(mapStateToProps, { logout, confirmOTP, resendOTP, returnErrors })(emailConfirmation);