import React, { Component } from 'react'
import { connect } from 'react-redux';
import HeaderComponent from './Partials/headerComponent';
import SidebarComponent from './Partials/sidebarComponent';
import { syncOrders } from './../../actions/orderActions';
import { syncProducts } from './../../actions/productActions';

class showDashboard extends Component {

    constructor(props) {

        super(props);

    }

    componentDidMount() {
        // this.props.syncOrders();
        // this.props.syncProducts();
    }

    render() {

        return (

            <div className="main-panel">

                <SidebarComponent propData={this.props} />

                <div className="page-container">

                    <HeaderComponent propData={this.props} />

                    <div className="inner-panel">

                        <div className="page-top-action">
                            <div className="left-action">
                                <div className="title">Overview</div>
                            </div>
                            <div className="right-action">
                                {/* <ul>
                                    <li>
                                        <a href="#">Add Items </a>
                                    </li>
                                </ul> */}
                            </div>
                        </div>

                        <div className="top-graf-box">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="overview-item yellow">
                                        <div className="overview-inner">
                                            <div className="overview-box">
                                                <div className="icon">
                                                    <i className="fa fa-user-o" aria-hidden="true"></i>
                                                </div>
                                                <div className="title-text">
                                                    <div className="main-title">10368</div>
                                                    <div className="memeber-status">members online</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="overview-item purple">
                                        <div className="overview-inner">
                                            <div className="overview-box">
                                                <div className="icon">
                                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                </div>
                                                <div className="title-text">
                                                    <div className="main-title">388,688</div>
                                                    <div className="memeber-status">items solid</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="overview-item green">
                                        <div className="overview-inner">
                                            <div className="overview-box">
                                                <div className="icon">
                                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                                </div>
                                                <div className="title-text">
                                                    <div className="main-title">1,086</div>
                                                    <div className="memeber-status">This week</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                    <div className="overview-item blue">
                                        <div className="overview-inner">
                                            <div className="overview-box">
                                                <div className="icon">
                                                    <i className="fa fa-usd" aria-hidden="true"></i>
                                                </div>
                                                <div className="title-text">
                                                    <div className="main-title">1,060,386</div>
                                                    <div className="memeber-status">Total earnings</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="colum-panel">

                            <div className="row">

                                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">

                                    <div className="content-panel-box">
                                        <div className="top-bar-content">
                                            <div className="left-side">
                                                Product Details Bar
									</div>
                                            <div className="right-side">
                                                <a className="right-icon" data-toggle="collapse" href="#graph"></a>
                                            </div>
                                        </div>
                                        <div className="collapse-box collapse show" id="graph">
                                            <div className="graph-box" id="chartContainer" style={{ height: 300, width: 600 }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.mws.mwsData,
    loginData: state.auth.loggedInUser
})

export default connect(mapStateToProps, { syncOrders, syncProducts })(showDashboard);