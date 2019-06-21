import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { planPayment, paymentCancelled } from './../../actions/paymentActions';
import { Link } from 'react-router-dom';

//https://github.com/thinhvo0108/react-paypal-express-checkout
import PaypalExpressBtn from 'react-paypal-express-checkout';

class paymentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            failedMessage: null,
            errorMessage: null
        }
    }

    static propTypes = {
        plan: PropTypes.object.isRequired,
        planPayment: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        myPlan: PropTypes.object.isRequired
    }

    render() {

        const { user, myPlan } = this.props;

        const onSuccess = (payment) => {

            const data = {
                name: myPlan.planSelected,
                email: user.user.email,
                duration: myPlan.planDuration,
                price: myPlan.planPrice,
                currency: myPlan.planCurrency,
                service: myPlan.servicesIncluded,
                isPaymentVerified: payment.paid,
                transactionID: payment.paymentID
            }

            this.props.planPayment(data);

            this.props.history.push({
                pathname: '/mwsCredentials',
                state: { data: payment.paymentID }
            })

        }

        const onCancel = (data) => {

            const cancelData = {
                name: myPlan.planSelected,
                email: user.user.email,
                duration: myPlan.planDuration,
                price: myPlan.planPrice,
                currency: myPlan.planCurrency,
                service: myPlan.servicesIncluded,
                isPaymentVerified: false,
                transactionID: data.paymentID
            }

            this.props.paymentCancelled(cancelData);

            this.setState({ failedMessage: 'Payment Cancelled.' });

        }

        const onError = (err) => {
            this.setState({ errorMessage: err });
        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = parseInt(myPlan.planPrice);

        const client = {
            sandbox: 'AQTlq4N_1ILT5veIRKZa4YI6A_1pOA_IA5FgceHkj6Zex1wpJaBAzAYE7bqx36cDwnG2_S8fKzT8StMi',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        return (

            <div>
                <div className="banner-section inner-pages" style={{ backgroundImage: 'url(' + 'images/concept.jpg' + ')' }}>
                    <div className="container">
                        <div className="top-bar">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <a className="navbar-brand" href="index.html"><img alt="" src="images/main-logo.png" /></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end " id="navbarNavDropdown">
                                    <ul className="navbar-nav menus">
                                        <li className="nav-item active">
                                            <Link to='/' className="nav-link">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/' className="nav-link">About</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/showPlans' className="nav-link">Pricing</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/' className="nav-link">Blog</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/login' className="nav-link outline-btn">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/register' className="nav-link fill-btn">Sign up</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="banner-content">
                            <div className="banner-title">
                                PLANS DETAILS
					</div>
                            <div className="banner-subtitle">
                                Credit card payments are processed by Stripe.com and are completely secure. Also, you can cancel your plan at any time
                                with just one click. After your $1 USD trial has finished you will be billed the regular price of $19.95 USD per month until canceled.
					</div>
                        </div>
                    </div>
                </div>

                <div className="business-details">
                    <div className="container">
                        <div className="bussiness-details-content">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    <div className="business-user-pic">
                                        <div className="bussines-pic">
                                            <img alt="" src="images/user.jpg" />
                                        </div>
                                        <div className="upload-file">
                                            <span><i className="fa fa-cloud-upload" aria-hidden="true"></i></span>
                                            <input type="file" />
                                        </div>
                                        <div className="user-name">
                                            {user.user.name}
                                        </div>
                                        <div className="user-post">
                                            {user.user.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div className="business-details-form">
                                        <form className="form">
                                            <div className="input-group">
                                                <div className="label">
                                                    Plan Name
										</div>
                                                <div className="input-field">
                                                    <div className="inner-text">{myPlan.planSelected}</div>
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <div className="label">
                                                    Price
										</div>
                                                <div className="input-field">
                                                    <div className="inner-text price">{myPlan.planCurrency} {myPlan.planPrice}</div>
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <div className="label">
                                                    Payment Method
										</div>
                                                <div className="input-field">
                                                    <div className="radio-input">
                                                        <input type="radio" id="test1" name="radio-group" checked />
                                                        <label for="test1"> Paypal</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <div className="label">
                                                    Duration
										</div>
                                                <div className="input-field">
                                                    <div className="inner-text price">{myPlan.planDuration}</div>
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <div className="label">
                                                    Services Offered

										</div>
                                                <div className="input-field">
                                                    <div className="inner-text price">{myPlan.servicesIncluded}</div>
                                                </div>
                                            </div>

                                        </form>
                                        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />

                                        {
                                            this.state.failedMessage ? (<p style={{ color: 'red' }}>{this.state.failedMessage}</p>) : null
                                        }

                                        {
                                            this.state.err ? (<p style={{ color: 'red' }}>Error : {this.state.errorMessage}</p>) : null
                                        }

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
                                            <img alt="" src="images/white-logo-tiny.png" />
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
                                                    <Link to='/'>Home</Link>
                                                </li>

                                                <li>
                                                    <Link to='/'>Resources</Link>
                                                </li>

                                                <li>
                                                    <Link to='/'>About</Link>
                                                </li>

                                                <li>
                                                    <Link to='/'>Contact Us</Link>
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

const mapStateToProps = state => ({
    plan: state.plans.chosenPlan,
    user: state.auth,
    myPlan: state.auth.planSelected
})

export default connect(mapStateToProps, { planPayment, paymentCancelled })(paymentPage);