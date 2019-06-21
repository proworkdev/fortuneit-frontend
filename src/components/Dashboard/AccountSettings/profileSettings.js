import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { Button, Alert, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from './../../../actions/authActions';
import { editSellerProfile } from './../../../actions/profileActions';
import SweetAlert from 'react-bootstrap-sweetalert';

class profileSettings extends Component {

    constructor(props) {

        let userData = JSON.parse(sessionStorage.getItem('loginState'));

        console.log('Testing local storage in Profile Settings ==> ', userData)

        super(props);

        this.state = {
            username: userData.user.username,
            email: userData.user.email,
            businessName: userData.user.businessInfo.businessName,
            productNiche: userData.user.businessInfo.productCategory,
            address: userData.user.businessInfo.address,
            tagline: userData.user.businessInfo.businessTagline,
            sellerID: userData.user.SellerID,
            mwsAuthToken: userData.user.MwsToken,
            accessKey: userData.user.accessKeyId,
            accessSecret: userData.user.accessSecret,
            marketplaceId: userData.user.Marketplace,
            userType: userData.user.userType,
            successMessage: null,
            errorMessage: null,
            changePasswordVisible: true
        }
    }

    componentDidUpdate(prevProps) {

        const { success } = this.props;

        if (success !== prevProps.success) {

            if (success.isUpdated === true) {
                this.setState({ successMessage: success.message })
                window.scrollTo(0, 0)
            } else {
                this.setState({ errorMessage: success.data.message })
                window.scrollTo(0, 0)
            }

        }

    }

    logoutFunction() {

        sessionStorage.clear();

        this.props.history.push({
            pathname: '/login'
        });

    }

    onChangeText = (e) => {

        const { successMessage, errorMessage } = this.state;

        this.setState({ [e.target.name]: e.target.value })

        if (successMessage !== null || errorMessage !== null) {
            this.setState({
                successMessage: null,
                errorMessage: null
            })
        }

    }

    onConfirm = (e) => {

        sessionStorage.clear('loginState');

        this.props.logout();

        this.props.history.push({
            pathname: '/login'
        })

    }

    changePassword = () => {
        this.props.history.push({
            pathname: '/changePassword'
        })
    }

    onClick = (e) => {

        e.preventDefault();

        const { userType, username, email, businessName, productNiche, address, tagline, sellerID, mwsAuthToken, accessKey, accessSecret, marketplaceId } = this.state;

        const body = {
            username,
            email,
            businessName,
            productNiche,
            address,
            tagline,
            sellerID,
            mwsAuthToken,
            accessKey,
            accessSecret,
            marketplaceId
        }

        this.props.editSellerProfile(body);

    }

    render() {

        const { userType, username, email, businessName, productNiche, address, tagline, sellerID, mwsAuthToken, accessKey, accessSecret, marketplaceId } = this.state;

        return (
            <div>

                <div className="main-panel">

                    <SidebarComponent propData={this.props} />

                    <div className="page-container">

                        <HeaderComponent propData={this.props} />

                        <div className="inner-panel">

                            {
                                this.state.successMessage ? (
                                    <SweetAlert success title={this.state.successMessage} onConfirm={this.onConfirm}>
                                        Please login to continue.
                                    </SweetAlert>
                                ) : null
                            }
                            {
                                this.state.errorMessage ? (
                                    <Alert color="danger">{this.state.errorMessage}</Alert>
                                ) : null
                            }

                            <div className="page-top-action">
                                <div className="left-action">
                                    <div className="title">Manage Profile</div>
                                </div>
                                <div className="right-action">

                                </div>
                            </div>

                            <div className="colum-panel">
                                <div className="tab-box">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#General" role="tab" aria-controls="home" aria-selected="true"><i className="fa fa-user-circle-o" aria-hidden="true"></i> General Info</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#Manufacturing" role="tab" aria-controls="profile" aria-selected="false"><i className="fa fa-amazon" aria-hidden="true"></i> Amazon MWS Info</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="General" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="content-panel-box">
                                                <div className="top-bar-content">
                                                    <div className="left-side">
                                                        General Info
										</div>
                                                    <div className="right-side">
                                                        <a className="right-icon" data-toggle="collapse" href="#graph"></a>
                                                    </div>
                                                </div>
                                                <div className="collapse-box collapse show" id="graph">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                            <div className="form-group animated fadeInDown">
                                                                <form className="form">
                                                                    <div className="input-form">
                                                                        <div className="label">Full Name</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeText} className="form-control" name="username" value={username} type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-form">
                                                                        <div className="label">Email Address</div>
                                                                        <div className="input-field">
                                                                            <input disabled onChange={this.onChangeText} className="form-control" value={email} name="email" type="email" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-form">
                                                                        <div className="label">Business Name</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeText} className="form-control" name="businessName" value={businessName} type="text" />
                                                                        </div>
                                                                    </div>



                                                                    <div className="input-field">
                                                                        <div className="label">Industry/ Product Niche</div>
                                                                        <select onChange={this.onChangeText} value={productNiche} name="productNiche" className="form-control">
                                                                            <option>Select Item</option>
                                                                            <option>Food</option>
                                                                            <option>Clothing</option>
                                                                            <option>Cosmetics</option>
                                                                            <option>Health Care</option>
                                                                            <option>Footwear</option>
                                                                        </select>
                                                                    </div>
                                                                    <br />

                                                                    <div className="input-form">
                                                                        <div className="label">Address</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeText} className="form-control" name="address" value={address} type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-form">
                                                                        <div className="label">Tagline</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeText} className="form-control" name="tagline" value={tagline} type="text" />
                                                                        </div>
                                                                    </div>

                                                                    {
                                                                        userType !== 'viaGoogle' && 'viaFacebook' ? (
                                                                            <div className="input-form">
                                                                                <Nav>
                                                                                    <NavItem>
                                                                                        <NavLink href="" onClick={this.changePassword}>Change Password</NavLink>
                                                                                    </NavItem>
                                                                                </Nav>
                                                                            </div>
                                                                        ) : null
                                                                    }

                                                                    <Button onClick={this.onClick} block color="warning"><p style={{ color: '#fff' }} >Update</p></Button>

                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="Manufacturing" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="content-panel-box">
                                                <div className="top-bar-content">
                                                    <div className="left-side">
                                                        Amazon MWS Info
										</div>
                                                    <div className="right-side">
                                                        <a className="right-icon" data-toggle="collapse" href="#graph1"></a>
                                                    </div>
                                                </div>
                                                <div className="collapse-box collapse show" id="graph1">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                            <div className="form-group animated fadeInDown">
                                                                <form className="form">

                                                                    <div className="input-form">
                                                                        <div className="label">Seller ID</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeText} className="form-control" name="sellerID" value={sellerID} type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-form">
                                                                        <div className="label">MWS Token</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeText} className="form-control" name="mwsAuthToken" value={mwsAuthToken} type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-form">
                                                                        <div className="label">Access Key ID</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeText} className="form-control" name="accessKey" value={accessKey} type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-form">
                                                                        <div className="label">Access Secret</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeText} className="form-control" name="accessSecret" value={accessSecret} type="text" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-form">
                                                                        <div className="label">Marketplace</div>

                                                                        <div className="input-field">

                                                                            <select onChange={this.onChangeText} name="marketplaceId" value={marketplaceId} className="form-control">
                                                                                <option value="ATVPDKIKX0DER">USA</option>
                                                                            </select>

                                                                        </div>
                                                                    </div>

                                                                    <div className="input-form">
                                                                        <Button onClick={this.onClick} color="warning" block><p style={{ color: '#fff' }}>Update</p></Button>
                                                                    </div>

                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
    success: state.profile.data
})

export default connect(mapStateToProps, { editSellerProfile, logout })(profileSettings)