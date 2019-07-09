import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom'
import Styles from './Wizard/Styles';
import { Field } from 'react-final-form';
import Wizard from './Wizard/Wizard';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { productWizard, fetchProducts } from './../../../actions/productActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import $ from 'jquery';

const Error = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
        }
    />
)

const required = value => (value ? undefined : 'This field is mandatory.')

class addNewProduct extends React.PureComponent {

    constructor(props) {

        super(props);

        this.state = {
            productsList: [],
            modal: false,
            wizardCalculations: {},
            activeTab: 'first',
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    componentDidUpdate(prevProps) {

        const { products, data } = this.props;

        if (products !== prevProps.products) {
            this.setState({ productsList: products.data })
        }

        if (data !== prevProps.data) {
            this.setState({
                wizardCalculations: data.wizardData,
                modal: true
            })
        }

    }

    onSubmitData = (values) => {

        const body = {

            asin: values.asin,
            name: values.productName,
            desc: values.productDesc,
            link: values.webLink,
            contact: values.sellerContact,
            quantity: values.productQuantity,
            productCost: values.buyCost,
            sample: values.sampleFee,
            setup: values.setupFee,
            inspection: values.inspectionFee,
            misc: values.miscellaneousFee,
            shippingMethod: values.shippingMethod,
            shippingCost: values.shippingCost,
            miscShippingFee: values.miscShippingFee,
            listingServiceFee: values.listingServiceFee,
            salePrice: values.salePrice,
            targetNetProfitMargin: values.targetNetProfitMargin,
            referral: values.referralFee,
            fba: values.fbaFee,
            salesTarget: values.salesTarget
        }

        this.props.productWizard(body);

    }


    setTypes = (value) => {
        this.setState({ activeTab: value })
    }

    toggle = () => {
        const { modal } = this.state;
        this.setState({ modal: !modal })
    }


    render() {

        const { productsList, wizardCalculations } = this.state;

        const renderProducts = productsList.map((prod) => {
            return <option value={prod.ASIN}>{prod.ASIN}, {prod.ProductDesc}</option>
        })

        return (

            <div>

                <div className="main-panel">

                    <SidebarComponent propData={this.props} />

                    <div className="page-container">

                        <HeaderComponent propData={this.props} />

                        <div class="inner-panel">
                            <div class="page-top-action">
                                <div class="left-action">
                                    <div class="title">Add Product</div>
                                </div>
                                <div class="right-action">
                                    <ul>
                                        <li>
                                            <a href="#">Add Items</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="colum-panel">

                                <div class="tab-box">

                                    <ul class="nav nav-tabs" id="myTab" role="tablist">

                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#General" role="tab" aria-controls="home" aria-selected="true"><i class="fa fa-user-circle-o" aria-hidden="true"></i> General Info</a>
                                        </li>

                                        <li class="nav-item">
                                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#Manufacturing" role="tab" aria-controls="profile" aria-selected="false"><i class="fa fa-industry" aria-hidden="true"></i> Manufacturing</a>
                                        </li>

                                        <li class="nav-item">
                                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#Shipping" role="tab" aria-controls="contact" aria-selected="false"><i class="fa fa-ship" aria-hidden="true"></i> Shipping</a>
                                        </li>

                                        <li class="nav-item">
                                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#Staging" role="tab" aria-controls="profile" aria-selected="false"><i class="fa fa-truck" aria-hidden="true"></i> Staging</a>
                                        </li>

                                        <li class="nav-item">
                                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#Fulfillment" role="tab" aria-controls="contact" aria-selected="false"> <i class="fa fa-amazon" aria-hidden="true"></i> Fulfillment By Amazon</a>
                                        </li>

                                        <li class="nav-item">
                                            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#Profitability" role="tab" aria-controls="contact" aria-selected="false"><i class="fa fa-product-hunt" aria-hidden="true"></i> Profitability </a>
                                        </li>

                                    </ul>

                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="General" role="tabpanel" aria-labelledby="home-tab">
                                            <div class="content-panel-box">
                                                <div class="top-bar-content">
                                                    <div class="left-side">
                                                        General Info
										            </div>
                                                    <div class="right-side">
                                                        <a class="right-icon" data-toggle="collapse" href="#graph"></a>
                                                    </div>
                                                </div>
                                                <div class="collapse-box collapse show" id="graph">
                                                    <div class="row">
                                                        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                            <div class="form-group animated fadeInDown">
                                                                <form class="form">
                                                                    <div class="input-form">
                                                                        <div class="label">Product Name</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Product Description</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">ASIN</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form" >
                                                                        <a href="#" class="submit-btn btnNext" onClick={this.setTypes("second")} >Next</a>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="Manufacturing" role="tabpanel" aria-labelledby="profile-tab">

                                            <div class="content-panel-box">
                                                <div class="top-bar-content">
                                                    <div class="left-side">
                                                        Manufacturing
										        </div>
                                                    <div class="right-side">
                                                        <a class="right-icon" data-toggle="collapse" href="#graph1"></a>
                                                    </div>
                                                </div>
                                                {this.state.activeTab == 'second' ? <div class="collapse-box collapse show" id="graph1">

                                                    <div class="row">
                                                        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                            <div class="form-group animated fadeInDown">

                                                                <form class="form">

                                                                    <div class="input-form">
                                                                        <div class="label">Height</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>

                                                                    <div class="input-form">
                                                                        <div class="label">Width</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>

                                                                    <div class="input-form">
                                                                        <div class="label">Quantity Available</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>

                                                                    <div class="input-form">
                                                                        <div class="label">Cost Price/ Manufacturing Price</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>

                                                                    <div class="input-form">
                                                                        <a href="#" class="prev-btn btnPrevious" >Previous</a>
                                                                        <a href="#" class="submit-btn btnNext" >Next</a>
                                                                    </div>

                                                                </form>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> : null}
                                            </div>

                                        </div>

                                        <div class="tab-pane fade" id="Shipping" role="tabpanel" aria-labelledby="contact-tab">
                                            <div class="content-panel-box">
                                                <div class="top-bar-content">
                                                    <div class="left-side">
                                                        Shipping
										</div>
                                                    <div class="right-side">
                                                        <a class="right-icon" data-toggle="collapse" href="#graph2"></a>
                                                    </div>
                                                </div>
                                                <div class="collapse-box collapse show" id="graph2">
                                                    <div class="row">
                                                        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                            <div class="form-group animated fadeInDown">
                                                                <form class="form">
                                                                    <div class="input-form">
                                                                        <div class="label">Shipping Cost Per Unit</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Shipping Method</div>
                                                                        <div class="input-field">
                                                                            <select class="form-control" type="text">
                                                                                <option></option>
                                                                                <option>1</option>
                                                                                <option>2</option>
                                                                                <option>3</option>
                                                                                <option>4</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div class="input-form">
                                                                        <a href="#" class="prev-btn btnPrevious" >Previous</a>
                                                                        <a href="#" class="submit-btn btnNext" >Next</a>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="Staging" role="tabpanel" aria-labelledby="home-tab">
                                            <div class="content-panel-box">
                                                <div class="top-bar-content">
                                                    <div class="left-side">
                                                        Staging
										</div>
                                                    <div class="right-side">
                                                        <a class="right-icon" data-toggle="collapse" href="#graph3"></a>
                                                    </div>
                                                </div>
                                                <div class="collapse-box collapse show" id="graph3">
                                                    <div class="row">
                                                        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                            <div class="form-group animated fadeInDown">
                                                                <form class="form">
                                                                    <div class="input-form">
                                                                        <div class="label">Sample Fee</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Setup Fee</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Inspection Fee</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Misc Fee</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <a href="#" class="prev-btn btnPrevious" >Previous</a>
                                                                        <a href="#" class="submit-btn btnNext" >Next</a>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="Fulfillment" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="content-panel-box">
                                                <div class="top-bar-content">
                                                    <div class="left-side">
                                                        Fulfillment By Amazon
										            </div>
                                                    <div class="right-side">
                                                        <a class="right-icon" data-toggle="collapse" href="#graph4"></a>
                                                    </div>
                                                </div>
                                                <div class="collapse-box collapse show" id="graph4">
                                                    <div class="row">
                                                        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                            <div class="form-group animated fadeInDown">
                                                                <form class="form">
                                                                    <div class="input-form">
                                                                        <div class="label">Fulfilled by</div>
                                                                        <div class="input-field">
                                                                            <select class="form-control" type="text">
                                                                                <option></option>
                                                                                <option>FBA</option>
                                                                                <option>FBM</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Product Description</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">ASIN</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <a href="#" class="prev-btn" >Previous</a>
                                                                        <a href="#" class="submit-btn" >Next</a>
                                                                    </div>
                                                                </form>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane fade" id="Profitability" role="tabpanel" aria-labelledby="contact-tab">
                                            <div class="content-panel-box">
                                                <div class="top-bar-content">
                                                    <div class="left-side">
                                                        Profitability
										            </div>
                                                    <div class="right-side">
                                                        <a class="right-icon" data-toggle="collapse" href="#graph5"></a>
                                                    </div>
                                                </div>
                                                <div class="collapse-box collapse show" id="graph5">
                                                    <div class="row">
                                                        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                                            <div class="form-group animated fadeInDown">
                                                                <form class="form">
                                                                    <div class="input-form">
                                                                        <div class="label"> Total Cost</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Sales Pricen</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Net Fees</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <div class="label">Net Profit</div>
                                                                        <div class="input-field">
                                                                            <input class="form-control" type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="input-form">
                                                                        <a href="#" class="prev-btn" >Previous</a>
                                                                        <a href="#" class="submit-btn" >Next</a>
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

                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}><u>Evaluator</u></ModalHeader>
                            <ModalBody>
                                I am the Modal Body
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Okay</Button>
                            </ModalFooter>
                        </Modal>

                    </div>
                </div>
            </div>
        )
    }
}



$(document).ready(function () {
    $('.btnNext').click(function () {
        $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    });

    $('.btnPrevious').click(function () {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });
});


const mapStateToProps = state => ({
    products: state.product.products,
    data: state.product.wizardData
})

export default connect(mapStateToProps, { productWizard, fetchProducts })(addNewProduct)