import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { choosePlan } from '../../../actions/planActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class viewPlan extends Component {

	constructor(props) {

		super(props);

		this.state = {
			planData: props.location && props.location.state ? props.location.state.planDetails : '',
		}

	}

	static propTypes = {
		choosePlan: PropTypes.func.isRequired
	}

	subscribePlan() {

		const { planData } = this.state;

		this.props.choosePlan(planData);

		this.props.history.push({
			pathname: '/register',
			state: { planDetails: planData }
		});

	}

	render() {

		const { planData } = this.state;

		return (
			<div>
				<div className="banner-section inner-pages" style={{ backgroundImage: 'url(' + 'images/plan-pack.jpg' + ')' }}>
					<div className="container">
						<div className="top-bar">
							<nav className="navbar navbar-expand-lg navbar-light bg-light">
								<a className="navbar-brand" href="index.html"><img alt="main" src="images/main-logo.png" /></a>
								<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="collapse navbar-collapse justify-content-end " id="navbarNavDropdown">
									<ul className="navbar-nav menus">
										<li className="nav-item active">
											<Link className="nav-link">Home</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link">About</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link">Pricing</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link">Blog</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link">Login</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link">Sign up</Link>
										</li>
									</ul>
								</div>
							</nav>
						</div>
						<div className="banner-content">
							<div className="banner-title">
								Start Your {planData.currency} {planData.price} {planData.time} Trial
					</div>
							<div className="banner-subtitle">
								Credit card payments are processed by Stripe.com and are completely secure. Also, you can cancel your plan at any time
								with just one click. After your $1 USD trial has finished you will be billed the regular price of $19.95 USD per month until canceled.
					</div>
							<div className="get-start-btn">
								<a href="">Start Trial For $0 USD</a>
							</div>
						</div>
					</div>
				</div>

				<div className="plan-details">
					<div className="container">
						<div className="plan-detail-box">
							<div className="left-side">
								<div className="plan-title">
									Each Plan Including
						</div>
								<div className="plan-subtitle">
									Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old.
						</div>
								<div className="offer-list">
									<ul>
										<li> including versions of Lorem Ipsum.</li>
										<li> including versions of Lorem Ipsum.</li>
										<li> including versions of Lorem Ipsum.</li>
										<li> including versions of Lorem Ipsum.</li>
										<li> including versions of Lorem Ipsum.</li>
									</ul>
								</div>
								<div className="payment-method">
									<ul>
										<li><i className="fa fa-cc-mastercard" aria-hidden="true"></i></li>
										<li><i className="fa fa-cc-visa" aria-hidden="true"></i></li>
										<li><i className="fa fa-cc-amex" aria-hidden="true"></i></li>
										<li><i className="fa fa-cc-paypal" aria-hidden="true"></i></li>
									</ul>
								</div>
							</div>
							<div className="right-side">
								<div className="plan-detail-box">
									<div className="plan-type">
										{planData.name}
									</div>
									<div className="plan-cost">
										{planData.currency} {planData.price}
									</div>
									<div className="plan-order-list">
										<ul>
											{planData.service}
										</ul>
									</div>
									<div className="order-now">
										<button onClick={() => this.subscribePlan()} style={{ height: 40, width: 200, borderRadius: 5, backgroundColor: '#ecad00', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
											Subscribe Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>



				<div className="footer">
					<div className="container">
						<div className="footer-content">
							<div className="row">
								<div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
									<div className="footer-box">
										<div className="logo-box">
											<img alt="tiny logo" src="images/white-logo-tiny.png" />
										</div>
										<div className="footer-subtitles">
											42122  PN. Pennsylvania ., <br />
											Track 463 <br />
											Indianapolis, NY 400000  <br />
											United States
								</div>
									</div>
								</div>
								<div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
									<div className="footer-box">
										<div className="footer-title">
											QUICK LINKS
								</div>
										<div className="footer-subtitles">
											<ul>

												<li>
													<Link to=''>Home</Link>
												</li>

												<li>
													<Link to=''>Resources</Link>
												</li>

												<li>
													<Link to=''>About</Link>
												</li>

												<li>
													<Link to=''>Contact Us</Link>
												</li>

											</ul>
										</div>
									</div>
								</div>
								<div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
									<div className="footer-box">
										<div className="footer-title">
											SERVICES
								</div>
										<div className="footer-subtitles">
											<ul>
												<li>Product Research</li>
												<li>Listing Optimization</li>
												<li>Campaign Managment</li>
												<li>Animated Video Explainers</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
									<div className="footer-box">
										<div className="footer-title">
											SUBSCRIBE FOR UPDATES
								</div>
										<div className="footer-subtitles">
											Subscribe and we'll keep you in the loop
											when we add resources and information
											about our services!
								</div>
										<div className="footer-form">
											<div className="input-form">
												<input type="text" className="form-control" Placeholder="Name" />
												<input type="text" className="form-control" Placeholder="Email Id" />

												<Link className="submit">SUBMIT</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="copyright">
							<span>Privacy Policy</span>    <span>Terms & Conditions </span><span>Copyright © 2019 FORTUNEIT LLC. All rights reserved.</span>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default connect(null, { choosePlan })(viewPlan)