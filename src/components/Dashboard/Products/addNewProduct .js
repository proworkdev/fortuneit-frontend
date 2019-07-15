import React, { Component } from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import Styles from './Wizard/Styles';
import { Field } from 'react-final-form';
import Wizard from './Wizard/Wizard';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { productWizard, fetchProducts } from './../../../actions/productActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';

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
class addNewProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productsList: [],
            modal: false,
            wizardCalculations: {}
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


    toggle = () => {

        const { modal } = this.state;

        this.setState({ modal: !modal })

    }


    render() {

        const { productsList, wizardCalculations } = this.state;

        const renderProducts = productsList.map((prod) => {
            return <option value={prod.ASIN}>{prod.ASIN}, {prod.ProductDesc}</option>
        })
        if (wizardCalculations) {
            console.log('Calculations test in render ==> ', wizardCalculations);

        }

        return (

            <div>

                <div className="main-panel">

                    <SidebarComponent propData={this.props} />

                    <div className="page-container">

                        <HeaderComponent propData={this.props} />

                        <div className="inner-panel">

                            <h4><u></u></h4>

                            <br />

                            <Wizard
                                onSubmit={this.onSubmitData}
                            >

                                <Wizard.Page>
                                    <div>
                                        <h4><u>General Info</u></h4> <br />
                                        <label><b>ASIN</b></label>

                                        <br />
                                        <Field
                                            name="asin"
                                            component="input"
                                            type="text"
                                            placeholder="Enter ASIN"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Unique number assigned" />
                                        <Error name="asin" />
                                        <br />
                                        <br />
                                        <h5>OR</h5>
                                        <br />
                                        <div>
                                            <label><b>Select a product from inventory</b></label><br />
                                            <Field name="asin" component="select">
                                                {renderProducts}
                                            </Field>
                                            <Error name="asin" />
                                            <br /> <br />

                                        </div>
                                        <label><b>Product Name</b></label> <br />
                                        <Field
                                            name="productName"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Product Name"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Name of the Product that you are adding" />
                                        <br /> <br />
                                        <label><b>Product Description</b></label>
                                        <br />
                                        <Field
                                            name="productDesc"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Product Description"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Product Description" />
                                        <br /> <br />
                                        <label><b>Quantity</b></label> <br />
                                        <Field
                                            name="productQuantity"
                                            component="input"
                                            type="number"
                                            placeholder="Enter product Quantity"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Quantity of Product" />
                                        <Error name="productQuantity" />

                                        <br /><br />

                                    </div>
                                </Wizard.Page>
                                <Wizard.Page>
                                    <h4><u>Contact Information</u></h4><br />
                                    <label><b>Contact</b></label> <br />
                                    <Field
                                        name="sellerContact"
                                        component="input"
                                        type="number"
                                        placeholder="Enter Contact"
                                        validate={required}
                                    /><img src="images/info-part.png" className="info-names" title="Contact number" />
                                    <Error name="sellerContact" /> <br /> <br />
                                    <label><b>Website Link</b></label> <br />
                                    <Field
                                        name="webLink"
                                        component="input"
                                        type="text"
                                        placeholder="Enter your website's link"
                                        validate={required}
                                    />
                                    <img src="images/info-part.png" className="info-names" title="sfsdfsdgsdg" />
                                    <Error name="webLink" />

                                    <div>

                                    </div>
                                </Wizard.Page>
                                <Wizard.Page>
                                    <div>
                                        <h4><u>Manufacturing</u></h4><br />
                                        <label> <b>Sample fee</b></label>

                                        <br />

                                        <Field
                                            name="sampleFee"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Sample fee"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Sample Fee" />
                                        <br /><br />

                                        <label><b>Setup Fee</b></label><br />

                                        <Field
                                            name="setupFee"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Setup Fee "
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Setup Fee" />
                                        <br /> <br />

                                        <label><b>Inspection Fee</b></label><br />

                                        <Field
                                            name="inspectionFee"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Inspection Fee"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Inspection Fee" />
                                        <br /> <br />

                                        <label><b>MISC Fee</b></label>

                                        <br />
                                        <Field
                                            name="miscellaneousFee"
                                            component="input"
                                            type="text"
                                            placeholder="Enter MISC Fee"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="MISC Fee" />
                                        <Error name="asin" />
                                        <br /> <br />

                                        <label><b>Unit Price</b></label><br />
                                        <Field
                                            name="buyCost"
                                            component="input"
                                            type="number"
                                            placeholder="Enter purchase cost"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Buy Cost" />
                                        <Error name="buyCost" />
                                    </div>

                                </Wizard.Page>
                                <Wizard.Page>
                                    <div>
                                        <h4><u>Shipping</u></h4><br />

                                        <label><b>Shipping Method</b></label><br />
                                        <Field name="shippingMethod" component="select">
                                            <option />
                                            <option value="land">Land</option>
                                            <option value="sea">Sea</option>
                                            <option value="air">Air</option>
                                        </Field>
                                        <img src="images/info-part.png" className="info-names" title="Shipping" />
                                        <br /> <br />

                                        <label><b>Shipping Cost</b></label> <br />
                                        <Field
                                            name="shippingCost"
                                            component="input"
                                            type="number"
                                            placeholder="Enter Shipping Cost"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Shipping Cost" />
                                        <br /> <br />
                                        <label><b>Miscellaneous Shipping Fee</b></label> <br />
                                        <Field
                                            name="miscShippingFee"
                                            component="input"
                                            type="number"
                                            placeholder="Enter Miscellaneous Shipping Cost"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Miscellaneous Shipping Cost" />
                                        <Error name="miscShippingFee" />
                                    </div>

                                </Wizard.Page>
                                <Wizard.Page>
                                    <h4><u>Stagging</u></h4><br />
                                    <div>
                                        <label><b>Listing Services</b></label> <br />
                                        <Field
                                            name="listingServiceFee"
                                            component="input"
                                            type="number"
                                            placeholder="Enter listing Service Fee"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Staging" />
                                        <Error name="listingServiceFee" />
                                        <br /> <br />
                                    </div>
                                </Wizard.Page>
                                <Wizard.Page>
                                    <div>
                                        <h4><u>Fulfilment By Amazon</u></h4><br />
                                        <div>
                                            <label> <b>Referral Fee </b></label> <br />
                                            <Field
                                                name="referralFee"
                                                component="input"
                                                type="number"
                                                placeholder="Enter Referral Fee"
                                                validate={required}
                                            /><img src="images/info-part.png" className="info-names" title="Referral Fee " />
                                            <Error name="referralFee" />
                                            <br /> <br />
                                            <label> <b>FBA Fee</b></label> <br />
                                            <Field
                                                name="fbaFee"
                                                component="input"
                                                type="number"
                                                placeholder="Enter FBA Fee"
                                                validate={required}
                                            /><img src="images/info-part.png" className="info-names" title="FBA Fee" />
                                            <Error name="fbaFee" />
                                            <br /> <br />

                                            <label><b>Sales Price</b></label> <br />
                                            <Field
                                                name="salePrice"
                                                component="input"
                                                type="number"
                                                placeholder="Enter Sale Price"
                                                validate={required}
                                            /><img src="images/info-part.png" className="info-names" title="Sales Price" />
                                            <br /> <br />

                                        </div>
                                    </div>

                                </Wizard.Page>

                                <Wizard.Page>
                                    <div>
                                        <h4><u>Profitability</u></h4><br />

                                        <label><b>Target Net Profit Margin</b></label> <br />
                                        <Field
                                            name="targetNetProfitMargin"
                                            component="input"
                                            type="number"
                                            placeholder="Enter target net profit margin"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Target Net Profit Margin" />
                                        <br /> <br />
                                        <label><b>Monthly Sales Target</b></label> <br />
                                        <Field
                                            name="salesTarget"
                                            component="input"
                                            type="number"
                                            placeholder="Enter monthly sales target"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Monthly Sales Target" />
                                        <Error name="salesTarget" />

                                    </div>

                                </Wizard.Page>

                            </Wizard>

                        </div>
                        <Modal size="lg" isOpen={this.state.modal && wizardCalculations} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}><u>Evaluator</u></ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="left-part">
                                        <h4 className="top-name"><b><u>General Info</u></b></h4><br />
                                        <div>
                                            <label><b>ASIN </b></label>
                                            <span>{wizardCalculations.asin}</span><br />
                                            <label><b>Product Name </b></label>
                                            <span>{wizardCalculations.name}</span>

                                        </div><br /><br /><br /><br /><br />
                                        <div>
                                            <h4 className="top-name"><b><u>Manufacturing</u></b></h4><br />
                                            <label><b>Unit Price </b></label>
                                            <span>{wizardCalculations.productCost}</span><br />
                                            <label><b>setup Fee </b></label>
                                            <span>{wizardCalculations.setup}</span><br />
                                            <label><b>Order Total </b></label>
                                            <span>{wizardCalculations.orderSubTotal}</span><br />
                                            <label><b>Manufacturing Fee </b></label>
                                            <span>{wizardCalculations.manufacturingFee}</span><br />
                                            <label><b>Manufacturing Total </b></label>
                                            <span>{wizardCalculations.manufacturingTotal}</span><br /> <br />
                                        </div>

                                        <div>
                                            <h4 className="top-name"><b><u>Shipping</u></b></h4><br />
                                            <label><b>Estimated Shipping fee per order </b></label>
                                            <span></span><br />
                                            <label><b>Shipping Total </b></label>
                                            <span>{wizardCalculations.shippingTotal}</span><br />
                                            <label><b>Shipping Total Per Unit </b></label>
                                            <span>{wizardCalculations.shippingTotalPerUnit}</span><br /><br /><br />
                                        </div>

                                    </div>

                                    <div className="right-part"></div>
                                    <div>
                                        <h4 className="top-name"><b><u>Fulfillment By Amazon</u></b></h4><br />
                                        <label><b>Referal Fee </b></label>
                                        <span>{wizardCalculations.referral}</span><br />
                                        <label><b>MISC Fee </b></label>
                                        <span>{wizardCalculations.misc}</span><br />
                                        <label><b>Fulfilment Charges Per Order </b></label>
                                        <span>{wizardCalculations.fulfillmentChargesPerOrder}</span><br />
                                        <label><b>Fulfillment charges per unit </b></label>
                                        <span>{wizardCalculations.fulfillmentChargesPerUnit}</span>
                                        <label><b>Landed Cost Per Unit </b></label>
                                        <span>{wizardCalculations.landedCostPerUnit}</span><br />
                                        <label><b>Landed Cost Per Order </b></label>
                                        <span>{wizardCalculations.landedCostPerOrder}</span><br />
                                        <label><b>Suggested Sales Price </b></label>
                                        <span>{wizardCalculations.suggestedSalesPrice}</span><br /> <br />
                                    </div>

                                    <div>
                                        <h4 className="top-name"><b><u>Profitability</u></b></h4><br />
                                        <label><b>Estimated Pre Ad Profit Per Sale </b></label>
                                        <span>{wizardCalculations.estimatedPreAdProfitPerSale}</span><br />
                                        <label><b>Net Profit Margin </b></label>
                                        <span>{wizardCalculations.netProfitmargin}</span><br />
                                        <label><b>COGS Per Order </b></label>
                                        <span>{wizardCalculations.cogsPerOrder}</span><br />
                                        <label><b>Estimated Pre Ad Profit Per Order </b></label>
                                        <span>{wizardCalculations.estimatedPreAdProfitPerOrder}</span><br />
                                        <label><b>Breakeven ACoS Estimated Pre-APPS </b></label>
                                        <span>{wizardCalculations.breakevenAcosBasedOnEstimatedPreApps}</span><br />
                                        <label><b>Estimated net profit Per month </b></label>
                                        <span>{wizardCalculations.estimatedNetProfitMonth}</span><br />
                                        <label><b>Estimated Revenue Per Order </b></label>
                                        <span>{wizardCalculations.estimatedRevenuePerOrder}</span><br />
                                        <label><b>SalesToBreakeven </b></label>
                                        <span>{wizardCalculations.salesToBreakeven}</span><br />
                                        <label><b>Est Months to Sellout </b></label>
                                        <span>{wizardCalculations.monthsToSellout}</span><br />
                                    </div>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Okay</Button>
                            </ModalFooter>
                        </Modal>

                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    data: state.product.wizardData
})

export default connect(mapStateToProps, { productWizard, fetchProducts })(addNewProduct)