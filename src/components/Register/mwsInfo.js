import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mwsCredentials } from './../../actions/mwsActions';
import { NavLink, Button } from 'reactstrap';

class mwsInfo extends Component {

    constructor(props) {

        super(props);

        this.state = {
            sellerID: '',
            mwsToken: '',
            marketplaceID: '',
            accessKey: '',
            accessSecret: '',
            successMessage: null,
            failureMessage: null,
            transactionID: props.location && props.location.state ? props.location.state.data : null,
            transaction: true,
            verifiedSuccess: null
        }

        this.onChange = this.onChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    static propTypes = {
        // mwsData: PropTypes.object.isRequired,
        // mwsVerified: PropTypes.bool
    }

    componentDidUpdate(prevProps) {

        const { mwsData } = this.props;

        if (mwsData !== prevProps.mwsData) {

            if (mwsData.mwsVerified === true) {

                this.setState({ verifiedSuccess: true })
                // this.props.history.push({
                //     pathname: '/dashboard'
                // })
            }
            else {
                this.setState({ failureMessage: mwsData.message, successMessage: null })
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ transaction: false });
        }, 10000)
    }

    onChange(e) {

        const { successMessage, failureMessage, transaction } = this.state;

        if (successMessage !== null || failureMessage !== null, transaction) {
            this.setState({
                successMessage: null,
                failureMessage: null,
                transaction: false
            })
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    submitData(e) {

        e.preventDefault();

        const { sellerID, mwsToken, marketplaceID, accessKey, accessSecret } = this.state;

        const { user } = this.props;

        const data = {
            sellerID,
            mwsToken,
            marketplaceID,
            accessKey,
            accessSecret,
            email: user.email
        }

        this.props.mwsCredentials(data);
    }

    render() {

        return (

            <div>
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
                                            this.state.transaction ? (
                                                <div>
                                                    <p style={{ color: 'green' }}>Congrats, payment has been done successfully.</p>
                                                    <p style={{ color: 'green' }}>Your transaction ID is {this.state.transactionID}</p>
                                                    <p style={{ color: 'green' }}>A receipt has been sent to your email ID.</p>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            this.state.failureMessage ? (
                                                <p style={{ color: 'red' }}>{this.state.failureMessage}</p>
                                            ) : null
                                        }

                                        <b>Enter your Amazon MWS credentials.</b>
                                        <form className="form">
                                            <div className="email-message">

                                            </div>
                                            <div className="input-form">
                                                <div className="label">Seller ID</div>
                                                <div className="input-field">
                                                    <input name="sellerID" onChange={this.onChange} className="form-control" type="text" />
                                                </div>
                                            </div>
                                            <div className="input-form">
                                                <div className="label">MWS Auth Token</div>
                                                <div className="input-field">
                                                    <input name="mwsToken" onChange={this.onChange} className="form-control" type="text" />
                                                </div>
                                            </div>
                                            <div className="input-form">
                                                <div className="label">Access Key ID</div>
                                                <div className="input-field">
                                                    <input name="accessKey" onChange={this.onChange} className="form-control" type="text" />
                                                </div>
                                            </div>
                                            <div className="input-form">
                                                <div className="label">Access Secret</div>
                                                <div className="input-field">
                                                    <input name="accessSecret" onChange={this.onChange} className="form-control" type="text" />
                                                </div>
                                            </div>
                                            <div className="input-field">
                                                <select onChange={this.onChange} name="marketplaceID" className="form-control">
                                                    <option>Select Item</option>
                                                    <option value="ATVPDKIKX0DER">US</option>
                                                </select>
                                            </div>

                                            <br />

                                            <Button color="primary" block className="submit-btn" onClick={this.submitData} href="#" >
                                                Submit
											</Button>

                                        </form>

                                        <br />

                                        {
                                            this.state.successMessage ? (
                                                <p style={{ color: 'green' }}>{this.state.successMessage}</p>
                                            ) : null
                                        }

                                    </div>

                                    {
                                        this.state.verifiedSuccess ? (
                                            <div>
                                                <b>Congrats! Your Amazon MWS credentials have been verified.</b>
                                                <p>Please sign in to continue.</p>
                                                <p>Click <a href="/login">here</a> to login.</p>
                                            </div>
                                        ) : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </div >

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    mwsVerified: state.mws.mwsVerified,
    mwsData: state.mws.mwsData
})

export default connect(mapStateToProps, { mwsCredentials })(mwsInfo)