import React, { Component } from 'react'
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { Button } from 'reactstrap';
import { addNewProduct } from './../../../actions/productActions';
import { connect } from 'react-redux';

class addProduct extends Component {

    constructor(props) {

        super(props);

        this.state = {

            userData: JSON.parse(sessionStorage.getItem('loginState')),
            sku: '',
            asin: '',
            productTitle: '',
            productBrand: '',
            productDescription: '',
            productPrice: '',
            productManufacturer: ''

        }

    }

    onChangeFunction = (e) => {

        this.setState({ [e.target.name]: e.target.value });

    }

    onSubmitFunction = (e) => {

        e.preventDefault();

        const { sku, asin, productTitle, productBrand, productDescription, productPrice, productManufacturer } = this.state;

        const body = { sku, asin, productTitle, productBrand, productDescription, productPrice, productManufacturer }

        this.props.addNewProduct(body);

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
                                    <div className="title">Add Product</div>
                                </div>
                            </div>

                            <div className="colum-panel">

                                <form className="form">

                                    <div className="email-message">

                                    </div>

                                    <div className="input-form">
                                        <div className="label">SKU</div>
                                        <div className="input-field">
                                            <input name="sku" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-form">
                                        <div className="label">ASIN</div>
                                        <div className="input-field">
                                            <input name="asin" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-form">
                                        <div className="label">Product Title</div>
                                        <div className="input-field">
                                            <input name="productTitle" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-form">
                                        <div className="label">Product Brand</div>
                                        <div className="input-field">
                                            <input name="productBrand" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-form">
                                        <div className="label">Product Description</div>
                                        <div className="input-field">
                                            <input name="productDescription" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-form">
                                        <div className="label">Price</div>
                                        <div className="input-field">
                                            <input name="productPrice" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="input-form">
                                        <div className="label">Manufacturer</div>
                                        <div className="input-field">
                                            <input name="productManufacturer" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>

                                    <br />

                                    <Button color="warning" block className="submit-btn" onClick={this.onSubmitFunction} href="#" >
                                        <p style={{ color: '#fff' }}>Submit</p>
                                    </Button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { addNewProduct })(addProduct)