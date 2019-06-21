import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
	NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from './../../actions/authActions';
import { clearErrors } from './../../actions/errorActions';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class Login extends Component {

	constructor(props) {

		super(props);

		this.state = {
			email: props.location && props.location.state ? props.location.state.email : '',
			password: '',
			fieldsValidation: null,
			userExists: null,
			invalidPassword: null,
			errorMessage: null
		};

		this.forgotPassword = this.forgotPassword.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

	}

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		// error: PropTypes.object.isRequired,
		// login: PropTypes.func.isRequired,
		// clearErrors: PropTypes.func.isRequired
	}

	componentDidUpdate(prevProps) {

		const { isAuthenticated, error, loginData } = this.props;

		//------------IF USER IS AUTHENTIC--------------
		if (isAuthenticated !== prevProps.isAuthenticated) {

			if (isAuthenticated === true) {

				if (loginData.user.isBusinessAdded === true) {
					if (loginData.user.isPlanSelected === true) {
						if (loginData.user.isPaymentReceived === true) {
							if (loginData.user.isMwsVerified === true) {
								this.props.history.push({
									pathname: '/dashboard'
								})
							} else {
								this.props.history.push({
									pathname: '/mwsCredentials'
								})
							}
						} else {
							this.props.history.push({
								pathname: '/payment'
							})
						}
					} else {
						this.props.history.push({
							pathname: '/showAllPlans'
						})
					}
				} else {
					this.props.history.push({
						pathname: '/businessInfo'
					})
				}
			}
		}

		if (error !== prevProps.error) {
			this.setState({ errorMessage: error.data.message })
		}

	}

	onChange(e) {

		const { errorMessage } = this.state;

		if (errorMessage !== null) {
			this.setState({
				errorMessage: null
			})
		}

		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {

		e.preventDefault();

		const { email, password } = this.state;

		const userData = {
			email: email,
			password: password,
			origin: 'front'
		};

		this.props.login(userData);

	}

	forgotPassword() {
		this.props.history.push({
			pathname: '/forgotPassword',
			state: { email: this.state.email }
		})
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

									{
										this.state.errorMessage ? (<p style={{ color: 'red' }}>{this.state.errorMessage}</p>) : null
									}

									<form onSubmit={this.onSubmit} className="form">
										<div className="input-form">
											<div className="label">Email Id</div>
											<div className="input-field">
												<input className="form-control" onChange={this.onChange} name="email" type="email" value={this.state.email} />
											</div>
										</div>
										<div className="input-form">
											<div className="label">Password</div>
											<div className="input-field">
												<input className="form-control" onChange={this.onChange} name="password" type="password" />

											</div>
										</div>
										<div className="input-form">
											<button type="submit" className="submit-btn">Submit</button>
										</div>
										<div className="forget">
											<NavLink onClick={this.forgotPassword} href="#" >
												Forgot Password?
											</NavLink>
										</div>
										<div className="forget">
											<Link to='/register' className="menu-btn">Create an Account</Link>
										</div>
									</form>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.auth.loginErrorData,
	loginData: state.auth.loggedInUser
})

export default connect(mapStateToProps, { login, clearErrors })(Login);