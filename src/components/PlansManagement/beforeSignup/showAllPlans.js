import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchAllPlans } from '../../../actions/planActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class showAllPlans extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plans: []
        }
    }

    static propTypes = {
        fetchAllPlans: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.fetchAllPlans();
    }

    componentDidUpdate(prevProps) {

        const { successdata } = this.props;

        if (successdata !== prevProps.successdata) {
            this.setState({ plans: successdata.plans })
        }
    }

    selectPlan(name, currency, price, service, time) {

        var planData = {
            name: name,
            currency: currency,
            price: price,
            service: service,
            time: time
        }

        this.props.history.push({
            pathname: '/viewPlan',
            state: { planDetails: planData }
        })
    }

    render() {

        const { plans } = this.state;

        return (
            <div>
                <div className="banner-section inner-pages" style={{ backgroundImage: 'url(' + 'images/dollar-2.jpg' + ')' }}>
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
                                            <Link to="/" className="nav-link">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link">About</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link">Pricing</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link">Blog</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/register" className="nav-link">Sign up</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="banner-content">
                            <div className="banner-title">
                                Invest in your growth on Amazon
					</div>
                            <div className="banner-subtitle">
                                We try to accomodate all sizes of businesses with a fair price for everyone. Therefore, what you pay for our software depends on your business volume.
					</div>
                            <div className="get-start-btn">
                                <a href="#">Gat Start</a>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="free-trail">
                    <div className="container">
                        <div className="trails-section">
                            <div className="trails-heading">
                                Pricing Plan
					</div>
                        </div>
                    </div>
                </div>

                <div className="pricing-plan">
                    <div className="container">
                        <div className="pricing-content-box">
                            <ul>

                                {
                                    plans.map((plan, key) => (
                                        <li>
                                            <div className="price-box">
                                                <div className="plan-icon">
                                                    <img alt="" src="images/icon-4.png" />
                                                </div>
                                                <div className="price-title">
                                                    {plan.name}
                                                </div>
                                                <div className="price-rate">
                                                    {plan.currency} {plan.price}
                                                </div>
                                                <div className="price-inner-list">
                                                    <ul>
                                                        <li>{plan.service}</li>
                                                    </ul>
                                                </div>
                                                <div className="start-now">
                                                    <button onClick={() => this.selectPlan(plan.name, plan.currency, plan.price, plan.service, plan.time)} style={{ height: 40, width: 200, borderRadius: 5, backgroundColor: '#ecad00', alignItems: 'center', justifyContent: 'center', color: '#fff' }} >Start Now</button>
                                                </div>

                                            </div>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>

                    </div>
                </div>

                <div className="free-trail">
                    <div className="container">
                        <div className="trails-section">
                            <div className="trails-heading">
                                Start your free trial now!
					</div>
                            <div className="slogan">
                                No credit card required
					</div>
                            <div className="trail-btn">
                                <a href="#">BUILD YOUR BUSINESS FOR FREE</a>

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
                                                    <Link>Home</Link>
                                                </li>

                                                <li>
                                                    <Link>Resources</Link>
                                                </li>

                                                <li>
                                                    <Link>About</Link>
                                                </li>

                                                <li>
                                                    <Link>Contact Us</Link>
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
    successdata: state.plans
})

export default connect(mapStateToProps, { fetchAllPlans })(showAllPlans);