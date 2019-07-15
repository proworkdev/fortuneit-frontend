import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { addNewOrder } from './../../../actions/orderActions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class addOrder extends Component {

    constructor(props) {

        super(props);

        this.state = {

            productSelected: '',
            orderQuantity: '',
            customerName: '',
            customerEmail: '',
            shippingAddress: '',
            billingAddress: ''

        }
    }

    onChangeFunction = (e) => {

        this.setState({ [e.target.name]: e.target.value });

    }

    submitFunction = (e) => {

        e.preventDefault();

        const { productSelected, orderQuantity, customerName, customerEmail, shippingAddress, billingAddress } = this.state;

        const body = {
            productSelected,
            orderQuantity,
            customerName,
            customerEmail,
            shippingAddress,
            billingAddress
        }

        this.props.addNewOrder(body);

    }

    render() {

        return (

            <div>
                <div className="main-panel">

                    <SidebarComponent propData={this.props} />

                    <div className="page-container">

                        <HeaderComponent propData={this.props} />

                        <div className="inner-panel">

                            <div className="page-top-action">

                                <div className="left-action">
                                    <div className="title">Add Order</div>
                                </div>

                                <div className="right-action">
                                    <ul>
                                        <li>
                                            <a href="">Add Items </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                            <div className="colum-panel">

                                <div className="tab-box">

                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#General" role="tab" aria-controls="home" aria-selected="true"><i className="fa fa-user-circle-o" aria-hidden="true"></i> General Info</a>
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
                                                                        <div className="label">Select Product</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeFunction} name="productSelected" className="form-control" type="text" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-form">
                                                                        <div className="label">Enter Quantity</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeFunction} name="orderQuantity" className="form-control" type="text" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-form">
                                                                        <div className="label">Customer Name</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeFunction} name="customerName" className="form-control" type="text" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-form">
                                                                        <div className="label">Customer Email</div>
                                                                        <div className="input-field">
                                                                            <input onChange={this.onChangeFunction} name="customerEmail" className="form-control" type="email" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-form">
                                                                        <div className="label">Shipping Address</div>
                                                                        <div className="input-field">
                                                                            <textarea onChange={this.onChangeFunction} name="shippingAddress" rows="4" cols="70" ></textarea>
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-form">
                                                                        <div className="label">Billing Address</div>
                                                                        <div className="input-field">
                                                                            <textarea onChange={this.onChangeFunction} name="billingAddress" rows="4" cols="70" ></textarea>
                                                                        </div>
                                                                    </div>

                                                                    <div className="input-form">
                                                                        <Button onClick={this.submitFunction} color="warning" block><p style={{ color: '#fff' }}>Submit</p></Button>
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

export default connect(null, { addNewOrder })(addOrder)
