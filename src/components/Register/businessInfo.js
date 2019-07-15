import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBusinessInfo } from './../../actions/authActions';
import { Link } from 'react-router-dom';

class businessInfo extends Component {

    constructor(props) {

        super(props);

        this.state = {
            username: props.location && props.location.state ? props.location.state.username : '',
            email: props.userdata.user.email,
            businessName: null,
            productCategory: null,
            address: null,
            businessTagline: null,
            userImage: null,
            successMessage: null,
            errorMessage: null,
            plan: props.planData
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        // userdata: PropTypes.object.isRequired,
        // businessSuccessData: PropTypes.object.isRequired,
        // businessFailureData: PropTypes.object.isRequired,
    }

    componentDidUpdate(prevProps) {

        const { businessSuccessData, businessFailureData, planData, doesPlanExist } = this.props;

        const { plan } = this.state;

        if (businessSuccessData !== prevProps.businessSuccessData) {

            if (businessSuccessData.success === true) {

                if (doesPlanExist === true) {

                    this.props.history.push({
                        pathname: '/payment'
                    });

                } else {

                    this.props.history.push({
                        pathname: '/showAllPlans'
                    });
                }
            }
        }

        if (businessFailureData !== prevProps.businessFailureData) {
            if (businessFailureData.message.success === false) {
                this.setState({ errorMessage: businessFailureData.message.message })
            }
        }
    }

    onChange(e) {

        const { successMessage, errorMessage } = this.state;

        if (successMessage !== null || errorMessage !== null) {
            this.setState({
                successMessage: null,
                errorMessage: null
            })
        }

        this.setState({ [e.target.name]: e.target.value })

    }

    onSubmit(e) {

        e.preventDefault();

        const { businessName, productCategory, address, businessTagline, userImage, email } = this.state;

        const data = {
            businessName: businessName,
            productCategory: productCategory,
            address: address,
            businessTagline: businessTagline,
            userImage: userImage,
            email: email
        }

        this.props.addBusinessInfo(data);
    }

    render() {

        const { userdata } = this.props;

        return (

            <div>
                <div className="banner-section inner-pages" style={{ backgroundImage: 'url(' + 'images/bg-business.jpg' + ')' }}>
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
                                BUSINESS DETAILS
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
                                            <input onChange={this.onChange} name="userImage" />
                                        </div>
                                        <div className="user-name">
                                            {userdata.user.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                    <div className="business-details-form">
                                        <form className="form">
                                            {
                                                this.state.username ? (
                                                    <div style={{ marginBottom: 20 }} >
                                                        <h4>Welcome, <b>{this.state.username}</b>. Please enter your business details to proceed further.</h4>
                                                    </div>
                                                ) : null
                                            }
                                            {
                                                this.state.errorMessage ? (<p style={{ color: 'red' }}>{this.state.errorMessage}</p>) : null
                                            }
                                            <div className="input-group">
                                                <div className="label">
                                                    Business Name
            							</div>
                                                <div className="input-field">
                                                    <input onChange={this.onChange} name="businessName" type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <div className="label">
                                                    Industry / Product Niche
            							</div>
                                                <div className="input-field">
                                                    <select onChange={this.onChange} name="productCategory" className="form-control">
                                                        <option>Select Item</option>
                                                        <option>Food</option>
                                                        <option>Clothing</option>
                                                        <option>Cosmetics</option>
                                                        <option>Health Care</option>
                                                        <option>Footwear</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="input-group">
                                                <div className="label">
                                                    Address
            							    </div>

                                                <div className="input-field">
                                                    <textarea onChange={this.onChange} name="address" className="form-control" />
                                                </div>

                                            </div>

                                            <div className="input-group">
                                                <div className="label">
                                                    Tagline
            							</div>
                                                <div className="input-field">
                                                    <input onChange={this.onChange} name="businessTagline" type="text" className="form-control" />
                                                </div>
                                            </div>

                                        </form>
                                        <div className="input-group">
                                            <div className="input-field">

                                                <button className="form-control submit-btn" onClick={this.onSubmit}>submit</button>
                                                {
                                                    this.state.successMessage ? (<p style={{ color: 'green' }}>{this.state.successMessage}</p>) : null
                                                }
                                            </div>
                                        </div>
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
                                                <input type="text" className="form-control" placeholder="Name" />
                                                <input type="text" className="form-control" placeholder="Email Id" />
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
    userdata: state.auth,
    businessSuccessData: state.auth.businessData,
    businessFailureData: state.error.err,
    planData: state.plans.chosenPlan,
    doesPlanExist: state.auth.isPlanSelected
})

export default connect(mapStateToProps, { addBusinessInfo })(businessInfo);

