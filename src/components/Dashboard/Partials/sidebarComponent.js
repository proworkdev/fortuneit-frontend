import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class sidebarComponent extends Component {

  constructor(props) {

    super(props);
  }

  render() {
    return (
      <div>
        <div className="sidebar">

          <div className="dashboard-logo">
            <img alt="" className="large-logo" src="images/main-logo.png" />
            <img alt="" className="small-logo" src="images/fav-icon.png" />
          </div>

          <div className="menu-bar">

            <ul className="sidebar-menu">

              <li className="nav-item">
                <a href="/dashboard" className="sidebar-link">
                  <span className="icon-holder"><i className="fa fa-home" aria-hidden="true"></i> </span><span className="title">Home</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="sidebar-link " data-toggle="collapse" href="#product">
                  <span className="icon-holder"><i className="fa fa-tachometer" aria-hidden="true"></i> </span><span className="title">Product</span>
                </a>
                <ul id="product" className="submenu-bar collapse">

                  <li>
                    <Link to='/manageProducts' className="menu-btn">Manage Products</Link>
                  </li>

                  <li>
                    <Link to='/productFinder' className="menu-btn">Product Finder</Link>
                  </li>

                  <li>
                    <Link to='/productFee' className="menu-btn">Product Fee</Link>
                  </li>

                  <li>
                    <Link to='/productEvaluator' className="menu-btn">Product Evaluator</Link>
                  </li>

                </ul>
              </li>

              <li className="nav-item">
                <a className="sidebar-link" data-toggle="collapse" href="#order">
                  <span className="icon-holder"><i className="fa fa-envelope" aria-hidden="true"></i> </span><span className="title">Order</span>
                </a>
                <ul id="order" className="submenu-bar collapse">
                  {/* <li>
                    <a href="/addOrder" className="menu-btn">Add Order</a>
                  </li> */}
                  <li>
                    <Link to='/manageOrders' className="menu-btn">Manage Orders</Link>
                  </li>
                  <li>
                    <Link to='/refundRequests' className="menu-btn">Refunds</Link>
                  </li>
                </ul>
              </li>

              {/* <li className="nav-item">
                <a className="sidebar-link" data-toggle="collapse" href="#transaction">
                  <span className="icon-holder"><i className="fa fa-money" aria-hidden="true"></i> </span><span className="title">Transactions</span>
                </a>
                <ul id="transaction" className="submenu-bar collapse " >
                  <li className="">
                    <Link to='/allTransactions' className="menu-btn">All Transactions</Link>
                  </li>
                </ul>
              </li> */}

              <li className="nav-item">
                <a className="sidebar-link" data-toggle="collapse" href="#account">
                  <span className="icon-holder"><i className="fa fa-compass" aria-hidden="true"></i> </span><span className="title">Account Settings</span>
                </a>
                <ul id="account" className="submenu-bar collapse " >
                  <li className="">
                    <Link to='/profileSettings' className="menu-btn">Profile</Link>
                  </li>
                  <li>
                    <Link to='/subscriptionTier' className="menu-btn">Subscription Tier</Link>
                  </li>
                  {/* <li>
                    <a href="" className="menu-btn">Payment Method</a>
                  </li>
                  <li>
                    <a href="" className="menu-btn">Record History</a>
                  </li> */}
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </div>
    )
  }
}
