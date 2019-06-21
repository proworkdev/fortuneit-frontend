import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register, googleSignin, facebookSignin } from './../../actions/authActions';
import { clearErrors } from './../../actions/errorActions';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

class Register extends Component {

	constructor(props) {

		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			confirm_password: '',
			fieldsValidation: null,
			existingUserValidation: null,
			passwordValidation: null,
			planData: props.location && props.location.state ? props.location.state.planDetails : null,
			errorMessage: null,

			//----SOCIAL----
			isLoggedIn: false,
			userID: "",
			name: "",
			picture: "",
			fbToken: null,
			googleToken: null,
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static propTypes = {
		isEmailVerified: PropTypes.bool,
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired,
		googleSignin: PropTypes.func.isRequired,
		facebookSignin: PropTypes.func.isRequired,
	}

	componentDidUpdate(prevProps) {

		const { error, isEmailVerified, userdata, loginError } = this.props;

		if (userdata !== prevProps.userdata) {

			if (
				userdata.isEmailVerified === true
				&& userdata.isPlanSelected === true
				&& userdata.isBusinessAdded === true
				&& userdata.isPaymentReceived === true
				&& userdata.isMwsVerified === true
			) {
				this.props.history.push({
					pathname: '/dashboard'
				});
			} else {
				if (userdata.isEmailVerified === false) {
					this.setState({ errorMessage: 'Your social email address is not verified.' });
					window.scrollTo(0, 0);
				} else if (userdata.isPlanSelected === false) {
					this.props.history.push({
						pathname: '/showAllPlans'
					});
				} else if (userdata.isBusinessAdded === false) {
					this.props.history.push({
						pathname: '/businessInfo'
					});
				} else if (userdata.isPaymentReceived === false) {
					this.props.history.push({
						pathname: '/payment'
					});
				} else if (userdata.isMwsVerified === false) {
					this.props.history.push({
						pathname: '/mwsCredentials'
					});
				}
			}
		}

		if (loginError !== prevProps.loginError) {
			this.setState({ errorMessage: loginError.message });
			window.scrollTo(0, 0);
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

		const { username, email, password, confirm_password, planData } = this.state;

		if (planData !== null && planData !== undefined) {
			if (password === confirm_password) {

				const newUser = {
					username: username,
					email: email,
					password: password,
					role: 'seller',
					status: 'active',
					origin: 'front',
					plan: planData
				};
				this.props.register(newUser);
			}
			else {
				this.setState({ passwordValidation: 'Password & Confirm Password do not match.' })
			}
		} else {
			if (password === confirm_password) {

				const newUser = {
					username: username,
					email: email,
					password: password,
					role: 'seller',
					status: 'active',
					origin: 'front',
				};
				this.props.register(newUser);
			}
			else {
				this.setState({ passwordValidation: 'Password & Confirm Password do not match.' })
			}
		}
	}

	loginWithFacebook = (response) => {

		const { planData } = this.state;

		if (planData !== null && planData !== undefined) {
			const facebookUser = {
				facebookToken: response.accessToken,
				username: response.name,
				email: response.email,
				picture: response.picture.data.url,
				plan: planData
			}

			this.props.facebookSignin(facebookUser);

		} else {

			const facebookUser = {
				facebookToken: response.accessToken,
				username: response.name,
				email: response.email,
				picture: response.picture.data.url,
			}

			this.props.facebookSignin(facebookUser);
		}
	}

	loginWithGoogle = (response) => {

		const { planData } = this.state;

		const { tokenId } = response;

		if (planData !== null && planData !== undefined) {

			const token = {
				googleToken: tokenId,
				plan: planData
			}

			this.props.googleSignin(token);

		} else {
			const token = {
				googleToken: tokenId
			}

			this.props.googleSignin(token);
		}

	}

	render() {

		return (
			<div className="sign-up">

				<div className="container">

					<div className="top-title">
						<div className="top-logo-section">
							<img alt="" src="images/main-logo.png" />
						</div>
						{
							this.state.planData ? (<div className="heading-text">
								Sign up to FortuneIT for your {this.state.planData.currency} {this.state.planData.price} <b>{this.state.planData.name}</b> Plan!
						</div>) : <div className="heading-text">
									Sign up to FortuneIT for your FREE trial!
						</div>
						}

					</div>

					<div className="sign-up-box">
						<div className="right-section">
							<div className="login-form">

								{
									this.state.errorMessage ? (
										<p style={{ color: 'red' }}>{this.state.errorMessage}</p>

									) : null
								}

								<br />

								<div className="form-group">

									<form onSubmit={this.onSubmit} className="form">

										<div className="input-form">
											<div className="label">Full Name</div>
											<div className="input-field">
												<input name="username" onChange={this.onChange} className="form-control" type="text" />
											</div>
										</div>

										<div className="input-form">
											<div className="label">Email address</div>
											<div className="input-field">
												<input name="email" onChange={this.onChange} className="form-control" type="email" />
											</div>
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
												<input name="confirm_password" onChange={this.onChange} className="form-control" type="password" />
											</div>
										</div>

										<div className="input-form">
											<button type="submit" className="submit-btn">Submit</button>
										</div>

										<div className="forget">
											<span>Already have an account?</span> <Link to='/login' className="menu-btn">Sign In</Link>
										</div>

										<div className="authontic-social">

											<FacebookLogin
												appId="320111638549440"
												fields="name,email,picture"
												callback={this.loginWithFacebook}
											/>
											<GoogleLogin
												clientId="7858174253-loe7unvgbdgef13kamra6j8bqm4e458l.apps.googleusercontent.com"
												buttonText="LOGIN WITH GOOGLE"
												onSuccess={this.loginWithGoogle}
												onFailure={this.loginWithGoogle}
											/>
										</div>
										<div className="term-condition">
											By signing up, you agree to our Terms of Service, Privacy Policy and to receive ZonPages.com emails, newsletters & updates.
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
	isEmailVerified: state.auth.isEmailVerified,
	isAuthenticated: state.auth.isAuthenticated,
	userdata: state.auth.user,
	error: state.error,
	doesPlanExist: state.auth.isPlanSelected,
	loginError: state.auth.loginErrorData
})

export default connect(mapStateToProps, { register, clearErrors, googleSignin, facebookSignin })(Register);